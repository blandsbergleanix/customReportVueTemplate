<template>
  <div>
    <table>
      <thead>
        <tr>
          <td v-for="(columnName, idx) in columns.map(column => column.name)" :key="idx">{{columnName}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factsheet, idx) in factsheets" :key="idx">
          <td v-for="(key, idx) in columns.map(column => column.key)" :key="idx">
            {{factsheet[key]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['factsheets', 'columns']
}
</script>