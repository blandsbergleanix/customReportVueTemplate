<template>
  <div class="report-container">
    <div v-if="['view1', 'view2'].indexOf(view) > -1">
      <button @click="view = 'view1'">Customer </button>
      <button @click="view = 'view2'">Fact Sheet Overview</button>      
    </div>
    <main-table v-if="view === 'view1'" :factsheets="factsheets" @customerselected="onCustomerSelection" />
    <factsheet-overview v-if="view === 'view2'" :factsheets="factsheets"/>
    <detailed-view v-if="view === 'view3'" :customer="selectedFactsheet" @back="onBackEvent" />
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

export default {
  components: { MainTable, FactsheetOverview, DetailedView },
  data () {
    return {
      view: 'view1',
      factsheets: [],
      selectedFactsheet: {}
    }
  },
  methods: {
    onCustomerSelection (factsheet) {
      this.selectedFactsheet = factsheet
      this.view = 'view3'
    },
    onBackEvent () {
      this.view = 'view1'
    },
    fetchAllFactsheets () {
      const query = graphql.queries.FETCH_FACTSHEETS
      const variables = {
        filter: {
          facetFilters: [
            { facetKey: 'FactSheetTypes', keys: ['Application'] },
            { facetKey: 'hierarchyLevel', keys: ['1'] },
            {
              "facetKey":"lifecycle",
              "operator":"OR",
              "keys":["plan","phaseIn","active","phaseOut"],
              "dateFilter":{
                "from":"2018-01-17",
                "to":"2018-01-17",
                "type":"TODAY",
                "minDate":"2013-06-01",
                "maxDate":"2022-12-31"
              }
            }
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
              attributes: attributes.fsAttributes.concat(attributes.calcAttributes),
              callback: (filteredFactSheets) => {
                // console.log('FILTERED FACTSHEETS', filteredFactSheets)
      
                this.aggregations = { avg: {} };

                this.factsheets.reduce((avg, factsheet) => {
                  const attr 
                }, {})
                attributes.calcAttributes.forEach(attrbt => {
                  const attr = attrbt
                  let sum = 0;
                  this.factsheets.forEach(fs => {
                    if (attr === 'numberOfApplications') console.log('ATTR numberOfApplications', attr)
                    sum += fs[attrbt]
                  })
                  this.aggregations.avg[attrbt] = Math.round(sum / this.factsheets.length);
                  this.factsheets = filteredFactSheets;
                })
                console.log('AGGREG', this.aggregations)
              }
            }
          ]
        })
        this.fetchAllFactsheets()
      })
  }
}
</script>

<style lang="stylus" scoped>
  .report-container 
    background white 
    color black
    padding 16px
    width 1000px
    overflow-wrap normal
    border 1px solid black

  .item
    background white
    color white
    margin 8px
    padding 8px

  button {font-size: 24px; color: white; background-color: #009fdf; border: 2px solid #009fdf;}
  button:hover
    background-color #ccc
    color black
</style>
