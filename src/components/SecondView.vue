<template>
  <div>
    Second view
    <!-- Factsheet count is {{tableRows}}-->
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
        { name: 'Type', key: 'type' },
        { name: 'Current', key: 'current' },
        { name: '30 days ago', key: 'thirty' },
        { name: '90 days ago', key: 'ninety' }
      ]
    }
  },
  computed: {
    factSheetCount () {
      return this.factsheets.length
    },
    tableRows () {
      const factSheetTypes = [
        'Applications',
        'DataObjects',
        'ITComponents',
        'BusinessCapabilities',
        'Projects',
        'Providers',
        'Processes',
        'Interfaces',
        'OtherFactSheets'
      ]
      return factSheetTypes.map(type => this.factsheets
        .reduce((row, factsheet) => {
          if (!row.type) row.type = type
          row.current += factsheet[`numberOf${type}`],
          row.thirty += factsheet[`numberOf${type}Minus30`],
          row.ninety += factsheet[`numberOf${type}Minus90`]
          return row
        }, {current: 0, thirty: 0, ninety: 0}))
    }
  }
}
</script>