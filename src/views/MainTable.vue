<template>
  <div>
    Details
    <table>
      <thead>
        <tr>
          <!--<td v-for="(columnName, idx) in columns.map(column => column.name)" :key="idx">{{columnName}}</td>-->
          <td v-for="(column, idx) in columns" :key="idx">{{column.name}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factsheet, idx) in factsheets" :key="idx">
         <!-- <td v-for="(key, idx) in columns.map(column => column.key)" :key="idx">
            {{factsheet[key]}}
          </td>-->
          <td v-for="(column, idx) in columns" :key="idx">
            <!--{{factsheet[column[key]]}}-->
            {{factsheet[column.key]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['factsheets'],
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
        { name: 'Processes', key: 'numberOfProcesses' },
        { name: 'Interfaces', key: 'numberOfInterfaces' },
        { name: 'Other', key: 'numberOfOtherFactSheets' },
        { name: 'Unique User', key: 'numberOfUniqueUsersLast30Days' }
      ]
    }
  }
}
</script>