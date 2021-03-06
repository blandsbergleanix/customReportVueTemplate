<template>
  <div class="report-container">
    <div v-if="['customerOverview', 'factsheetTypeDetails'].indexOf(view) > -1">
      <button @click="view = 'customerOverview'">Customer </button>
      <button @click="view = 'factsheetTypeDetails'">Fact Sheet Overview</button>      
    </div>
    <main-table v-if="view === 'customerOverview'" :allStatistics="allStatistics" :factsheets="factsheets" @customerselected="onCustomerSelection" />
    <factsheet-overview v-if="view === 'factsheetTypeDetails'" :aggregations="aggregations" :factsheets="factsheets" />
    <detailed-view v-if="view === 'customerDetails'" :customer="selectedFactsheet" :editionAverage="editionAverage" @back="onBackEvent" />
  </div>
</template>

<script>
import '@leanix/reporting'
import MainTable from './views/MainTable.vue'
import FactsheetOverview from './views/FactsheetOverview'
import DetailedView from './views/DetailedView'
import graphql from './graphql'
import * as attributes from './attributes'
import { fsAttributes } from './attributes';

var math = require('mathjs');

export default {
  components: { MainTable, FactsheetOverview, DetailedView },
  data () {
    return {
      view: 'customerOverview',
      factsheets: [],
      allFactsheets: null,
      allStatistics: new Map(),
      selectedFactsheet: {},
      editionAverage: {},
      customer_FsCount: {}
    }
  },
  methods: {
    onCustomerSelection (factsheet) {
      this.selectedFactsheet = factsheet
      this.view = 'customerDetails'
      this.editionAverage = this.allStatistics.get(factsheet['edition'])
    },

    onBackEvent () {
      this.view = 'customerOverview'
    },

    calculateTotalFsCount () {
      this.factsheets.forEach(
        factsheet => {
            factsheet["numberOfTotalCount"] = this.countNumberOfFactsheets(factsheet, "")
            factsheet["numberOfTotalCountMinus30"] =  this.countNumberOfFactsheets(factsheet, "Minus30")
            factsheet["numberOfTotalCountMinus90"] =  this.countNumberOfFactsheets(factsheet, "Minus90")
        })    
    },
    countNumberOfFactsheets(factsheet, suffix){
      return  factsheet["numberOfApplications" + suffix]+
              factsheet["numberOfDataObjects" + suffix]+
              factsheet["numberOfITComponents" + suffix]+
              factsheet["numberOfBusinessCapabilities" + suffix]+
              factsheet["numberOfTechnologyStacks" + suffix]+
              factsheet["numberOfProjects" + suffix]+
              factsheet["numberOfProviders" + suffix]+
              factsheet["numberOfUserGroups" + suffix]+
              factsheet["numberOfProcesses" + suffix]+
              factsheet["numberOfInterfaces" + suffix]+
              factsheet["numberOfOtherFactSheets" + suffix]
    },
    calculateAvgForAllEditions(){
      var avgByEdition = {}

      const allEditons = new Set(this.allFactsheets
                                     .map(fact => fact.edition))
      allEditons.forEach(edition => {
        const filtered = this.allFactsheets.filter((fact) => fact['edition']==edition)
        this.allStatistics.set(edition, this.calculateAverage(filtered))
      })
    },
    calculateAverage (factsheets) {
      if (factsheets.length == 0)
        return null
      var firstSheet = factsheets[0]
      var statstics = {}
      statstics["edition"] = firstSheet.edition
      Object.keys(firstSheet)
            .filter(key => !isNaN(firstSheet[key]))
            .forEach(key => {
                var allValuesOfKey = new Array
                factsheets.map(fact => fact[key])
                          .forEach(value =>  allValuesOfKey.push(value))
                statstics[key] = {}
                statstics[key]["standard deviation"] = math.std(allValuesOfKey)
                statstics[key]["sum"] = math.sum(allValuesOfKey)
                statstics[key]["avg"] = math.mean(allValuesOfKey)
      })
      console.log(statstics)
      return factsheets.reduce((accu, factsheet, idx) => {
                  const type = factsheet.type
                  if (!accu[type]) 
                       accu[type] = { sum: {}, avg: {}}
                  const keys = Object.keys(factsheet)
                  const numberKeys = keys.filter(key => !isNaN(factsheet[key]))
                  numberKeys.map(key => {
                    if (!accu[type]['sum'][key]) 
                         accu[type]['sum'][key] = 0
                    accu[type]['sum'][key] += factsheet[key]
                  })
                  if (idx + 1 === factsheets.length) {
                     accu[type]['avg'] = Object.keys(accu[type].sum).reduce(
                       (avgAccu, key) => {
                          avgAccu[key] = Math.floor(accu[type]['sum'][key] / factsheets.length)
                        return avgAccu
                        }, {})
                  }
                  return accu
                }, {})
    },
    fetchAllFactsheets () {
      const query = graphql.queries.FETCH_FACTSHEETS
      const variables = {
        filter: {
          facetFilters: [
            { facetKey: 'FactSheetTypes', keys: ['Application'] },
            { facetKey: 'hierarchyLevel', keys: ['1'] },
          ]
        }
      }
    }
  },
  mounted () {
    lx.init()
      .then(setup => {
        this.setup = setup
        lx.ready({
          facets: [
            {
              fixedFactSheetType: 'Application',
              attributes: attributes.fsAttributes.concat(attributes.calcAttributes), callback: (filteredFactSheets) => {
                if (this.allFactsheets === null) {                  
                  this.allFactsheets = filteredFactSheets
                  this.calculateAvgForAllEditions()
                }
                this.factsheets = filteredFactSheets
                this.aggregations = Object.assign({}, this.calculateAverage(filteredFactSheets))
                this.calculateTotalFsCount()                
              }
            }
          ]
        })
      })
  }
}
</script>

<style lang="stylus">
  table
    border-collapse collapse
    width 100%

  th, td
    padding 8px
    text-align left
    border-bottom 1px solid #ddd

  tr:hover
    background-color #f5f5f5
    cursor pointer

  button {font-size: 1.5rem; color: white; background-color: #009fdf; border: 2px solid #009fdf;}
  button:hover
    background-color #ccc
    color black

</style>

<style lang="stylus" scoped>
  .report-container
    width 100% !important
    color black
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif
    font-size: 12px

  .item
    background white
    color white
    margin 8px
    padding 8px
</style>
