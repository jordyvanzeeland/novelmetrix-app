import DataTable from 'datatables.net-dt';

export const initDataTable = () => {
  let table = new DataTable('#DataTable');
    table.destroy();  
    setTimeout(() => {  
        table = new DataTable('#DataTable', {
            autoWidth: true,
            language: {
              url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json',
              search: "",
              searchPlaceholder: "Zoeken"
            },
            dom: 'rt<"bottom"p><"clear">',
            order: []
        });
    }, 300)
}