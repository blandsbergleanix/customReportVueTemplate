<template>
  <div class="report-container">
    <div>
      <button v-on:click="view = 'view1'">Details </button>
      <button v-on:click="view = 'view2'">General</button>
    </div>
    <main-table v-if="view === 'view1'" :factsheets="factsheets" />
    <factsheet-overview v-else :factsheets="factsheets"/>
  </div>
</template>

<script>
import '@leanix/reporting'
import MainTable from './views/MainTable.vue'
import FactsheetOverview from './views/FactsheetOverview'
import graphql from './graphql'

export default {
  components: { MainTable, FactsheetOverview },
  data () {
    return {
      view: 'view1',
      factsheets: []
    }
  },
  methods: {
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
              attributes: [
               'id',
               'name', 
               'numberOfApplications',
               'numberOfApplicationsMinus30',
               'numberOfApplicationsMinus90',
               'numberOfDataObjects',
               'numberOfDataObjectsMinus30',
               'numberOfDataObjectsMinus90',
               'numberOfITComponents',
               'numberOfITComponentsMinus30',
               'numberOfITComponentsMinus90',
               'numberOfBusinessCapabilities',
               'numberOfBusinessCapabilitiesMinus30',
               'numberOfBusinessCapabilitiesMinus90',
               'numberOfProjects',
               'numberOfProjectsMinus30',
               'numberOfProjectsMinus90',
               'numberOfProviders',
               'numberOfProvidersMinus30',
               'numberOfProvidersMinus90',
               'numberOfProcesses',
               'numberOfProcessesMinus30',
               'numberOfProcessesMinus90',
               'numberOfInterfaces',
               'numberOfInterfacesMinus30',
               'numberOfInterfacesMinus90',
               'numberOfOtherFactSheets',
               'numberOfOtherFactSheetsMinus30',
               'numberOfOtherFactSheetsMinus90',
               'numberOfDataObjectsMinus30',
               'numberOfDataObjectsMinus90',
               'numberOfUniqueUsersLast30Days'
               ],
              callback: (filteredFactSheets) => {
                // avg = calc(filteredFactSheets)
                // this.factsheets = filteredFactSheets.filter(fs => fs.??? > avg)
                this.factsheets = filteredFactSheets;
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
    overflow-wrap: normal
    border: 1px solid black
  
  .item
    background white
    color white
    margin 8px
    padding 8px

  button {font-size: 24px; color: white; background-color: #009fdf; border: 2px solid #009fdf;}
  button:hover {
    background-color: #ccc;
    color: black;
}
        

</style>
