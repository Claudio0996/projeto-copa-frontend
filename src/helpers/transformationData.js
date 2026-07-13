import * as XLSX from "xlsx"

const time = {
    "6a28354e6ca8b599604b2bc4": "Seleção Amarela",
    "6a28354e6ca8b599604b2bc5": "Seleção Verde",
    "6a28354e6ca8b599604b2bc6": "Seleção Azul"
}


export const transformData = (salesList) =>{
    const transformedData = salesList && salesList.map(item => ({Nome: item.vendor.name, Feito: new Date(item.realizedAt).toLocaleDateString(), Time: time[item.vendor.teamId], Funcao: item.vendor.job, Assistente: item.sdrId? item.sdrId.name : "Sem assistência" }))
    return transformedData;
}

 export const exportData = (list) => {
    const worksheet = XLSX.utils.json_to_sheet(list)
    const workbook =  XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");
    XLSX.writeFile(workbook, "Sales.xlsx", {compression: true});
}