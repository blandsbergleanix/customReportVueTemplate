<template>
  <div class="report-container">
    <div>
      <button v-on:click="view = 'view1'">v1 </button>
      <button v-on:click="view = 'view2'">v2</button>
    </div>
    <first-view v-if="view === 'view1'" :factsheets="factsheets" :columns="columns" />
    <second-view v-else />
  </div>
</template>

<script>
import '@leanix/reporting'
import FirstView from './components/FirstView'
import SecondView from './components/SecondView'
import graphql from './graphql'

export default {
  components: { FirstView, SecondView },
  data () {
    return {
      view: 'view1',
      factsheets: [],
      columns: [
        { name: 'Name', key: 'name' },
        { name: 'Applications', key: 'numberOfApplications' },
        { name: 'IT Components', key: 'numberOfITComponents' },
        { name: 'Data Objects', key: 'numberOfDataObjects' },
        { name: 'Business Capabilities', key: 'numberOfBusinessCapabilities' },
        { name: 'Projects', key: 'numberOfProjects' },
        { name: 'Provider', key: 'numberOfProviders' },
        { name: 'Processes', key: 'numberOfProcesses' },
        { name: 'Interfaces', key: 'numberOfInterfaces' },
        { name: 'Other', key: 'numberOfOtherFactSheets' }
      ]
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
      lx.executeGraphQL(query, variables)
        .then(res => {
          if (res.allFactSheets) {
            this.factsheets = res.allFactSheets.edges.map(edge => edge.node)
            this.sumApps = 0
            this.sumApps30 = 0
            this.sumApps90 = 0
            this.factsheets.forEach(factSheet => {
              this.sumApps = this.sumApps + factSheet.numberOfApplications
              this.sumApps30 = this.sumApps30 + factSheet.numberOfApplicationsMinus30
              this.sumApps90 = this.sumApps90 + factSheet.numberOfApplicationsMinus90
            });
          }
        })
        .catch(error => {
          console.error(error)
        })
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
              attributes: ['id', 'name'],
              callback: (filteredFactSheets) => {
                console.log(filteredFactSheets);
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
  
  .item
    background white
    color black
    margin 8px
    padding 8px

</style>
