<template>
   <div>
       <button @click="$emit('back')">Back</button>
        <table >
        <thead>
            <tr>
                <td v-for="(column, idx) in columns" :key="idx">
                <p v-if="idx !== 0"> {{column.name}}</p>
                <p v-else>{{customer.name}}</p></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, idx) in rows" :key="`row_${idx}`">
                <td v-for="(column, idx) in columns" :key="idx">
                    <p v-if="idx !== 0"> {{ customer[column.key + row.suffix] }}</p>
                    <p v-else>{{row.name}}</p>
                </td>
            </tr>
            <tr v-for="(row, idx) in rowsAverage" :key="idx">
                <td v-for="(column, idx) in columnsAverage" :key="idx">
                    <p v-if="idx !== 0"> {{ editionAverage['Application']['avg'][column.key + row.suffix]}} </p>
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
    props: ['customer',  'editionAverage'],
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
                { name: 'Processes', key: 'numberOfProcesses' },
                { name: 'Interfaces', key: 'numberOfInterfaces' },
                { name: 'Other', key: 'numberOfOtherFactSheets' },
                { name: 'Unique User', key: 'numberOfUniqueUsersLast30Days' }
            ],
            rows: [
                { name: 'Current count', suffix: '' },
                { name: 'Count 30 days ago', suffix: 'Minus30' },
                { name: 'Count 90 days ago', suffix: 'Minus90' }
            ],
            columnsAverage: [
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
            rowsAverage: [
                { name: 'Current average count in edition', suffix: '' },
                { name: 'Average 30 days ago in edition', suffix: 'Minus30' },
                { name: 'Average 90 days ago in edition', suffix: 'Minus90' }
            ]
        }
    },
    mounted () {
        console.log()
    }
}


</script>