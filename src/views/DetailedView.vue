<template>
   <div>
       <button @click="$emit('back')">Back</button>
        <table border = "1">
        <thead>
            <tr>
                <td v-for="(column, idx) in columns" :key="idx">
                    <p v-if="idx !== 0"> {{column.name}}</p>
                <p v-else>{{customer.name}}</p></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, idx) in rows" :key="idx">
                <td v-for="(column, idx) in columns" :key="idx">
                 <p v-if="idx !== 0"> {{ customer[column.key + row.suffix] }}</p>
                <p v-else>{{row.name}}</p>
                </td>
            </tr>
        </tbody>
        </table>
   </div>
</template>

<script>
export default {
    name: 'detailed-view',
    props: ['customer'],
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
            ],
            rows: [
                { name: 'Current', suffix: '' },
                { name: 'Minus30', suffix: 'Minus30' },
                { name: 'Minus90', suffix: 'Minus90' },
                { name: 'Average', suffix: 'Minus90' },
            ]
        }
    },
}


</script>

<style lang="stylus" scoped>
  button {font-size: 24px; color: white; background-color: #009fdf; border: 2px solid #009fdf;}
  button:hover
    background-color #ccc
    color black

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