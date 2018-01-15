<template>
  <div class="report-container">
    <div v-for="(factsheet, idx) in factsheets" :key="idx">
      {{factsheet}}
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
          ]
        }
      }
      lx.executeGraphQL(query, variables)
        .then(res => {
          if (res.allFactSheets) {
            this.factsheets = res.allFactSheets.edges.map(edge => edge.node)
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

</style>
