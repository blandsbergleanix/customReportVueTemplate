<template>
  <div class="report-container">
    <!--<div style="width:100%">
      Comment
    </div>-->
    <div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Applications</td>
            <td>IT Components</td>
            <td>Data Objects</td>
            <td>Business Capabilities</td>
            <td>Projects</td>
            <td>Provider</td>
            <td>Processes</td>
            <td>Interfaces</td>
            <td>Other</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(factsheet, idx) in factsheets" :key="idx">
            <td>{{factsheet.name}}</td>
            <td>{{factsheet.numberOfApplications}}</td>
            <td>{{factsheet.numberOfITComponents}}</td>
            <td>{{factsheet.numberOfDataObjects}}</td>
            <td>{{factsheet.numberOfBusinessCapabilities}}</td>
            <td>{{factsheet.numberOfProjects}}</td>
            <td>{{factsheet.numberOfProviders}}</td>
            <td>{{factsheet.numberOfProcesses}}</td>
            <td>{{factsheet.numberOfInterfaces}}</td>
            <td>{{factsheet.numberOfOtherFactSheets}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import '@leanix/reporting'
import graphql from './graphql'

export default {
  data () {
    return {
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
        lx.ready({})
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
