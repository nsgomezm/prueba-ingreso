import DataTablesCore from "datatables.net";
import DataTable from "datatables.net-vue3";
import Select from 'datatables.net-select';

import 'datatables.net-bs5'
import 'datatables.net-select';
import 'datatables.net-responsive-dt'

const langs = {
    es: `https://cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json`,
    en: `https://cdn.datatables.net/plug-ins/1.11.3/i18n/en-gb.json`,
}

DataTablesCore.defaults.aLengthMenu = [5,10,20,50,100]
DataTablesCore.defaults.bProcesing = true
DataTablesCore.defaults.aoColumnDefs = [
    { responsivePriority: 1, targets: 0 },
    { targets: [-1], orderable: false },
]
DataTablesCore.defaults.oLanguage.sUrl = langs[window.lang]

DataTable.use(Select)
DataTable.use(DataTablesCore)

export default DataTable
