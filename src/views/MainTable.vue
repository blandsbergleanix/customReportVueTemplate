<template>
  <div>
    <table >
      <thead>
        <tr>
          <td v-for="(column, idx) in columns" :key="idx">{{column.name}}</td>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable" v-for="(factsheet, idx) in factsheets" :key="idx" @click="customerSelected(factsheet)">
          <td v-for="(column, idx) in columns" :key="idx">
            <div  v-bind:class="[{ 'aboveAverageInEdition': isAboveAverage(factsheet, column), 'belowAverageInEdition': isBelowAverage(factsheet, column) }, 'isAverageInEdition' ]"> {{factsheet[column.key]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['factsheets', 'allStatistics'],
  data () {
    return {
      columns: [
        { name: 'Name', key: 'name' },
        { name: 'Applications', key: 'numberOfApplications' },
        { name: 'DataObjects', key: 'numberOfDataObjects' },
        { name: 'IT Components', key: 'numberOfITComponents' },
        { name: 'Data Objects', key: 'numberOfDataObjects' },
        { name: 'Business Capabilities', key: 'numberOfBusinessCapabilities' },
        { name: 'Projects', key: 'numberOfProjects' },
        { name: 'Provider', key: 'numberOfProviders' },
        {name: 'UserGroups', key: 'numberOfUserGroups'},
        { name: 'Processes', key: 'numberOfProcesses' },
        { name: 'Interfaces', key: 'numberOfInterfaces' },
        { name: 'Other', key: 'numberOfOtherFactSheets' },
        { name: 'Unique User', key: 'numberOfUniqueUsersLast30Days' }
      ]
    }
  },
  methods: {
    customerSelected (factsheet) {
      this.$emit('customerselected', factsheet)
    },
    isAboveAverage (factsheet, column) {
      const test = factsheet[column.key] > this.allStatistics.get(factsheet.edition)[factsheet.type].avg[column.key]
      return test
    },
    isBelowAverage (factsheet, column) {
      const test = factsheet[column.key] < this.allStatistics.get(factsheet.edition)[factsheet.type].avg[column.key]
      return test
    }
  }
}
</script>

<style lang="stylus" scoped>
.aboveAverageInEdition
  color green

.belowAverageInEdition
  color red
</style>
