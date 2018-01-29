<template>
  <div>
    <table border = "1">
      <thead>
        <tr>
          <td v-for="(column, idx) in columns" :key="idx">{{column.name}}</td>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable" v-for="(factsheet, idx) in factsheets" :key="idx" @click="customerSelected(factsheet)">
          <td v-for="(column, idx) in columns" :key="idx">
            {{factsheet[column.key]}}
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.clickable
  cursor pointer

.aboveAverageInEdition
  color green

.belowAverageInEdition
  color red

.table-header
  background red
  color white

table {
  overflow: hidden;
}

tr:hover {
  background-color: #ffa;
}

td, th {
  position: relative;
}
td:hover::after,
th:hover::after {
  content: "";
  position: absolute;
  background-color: #ffa;
  left: 0;
  top: -5000px;
  height: 10000px;
  width: 100%;
  z-index: -1;
}
</style>