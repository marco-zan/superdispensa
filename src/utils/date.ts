
export const addDays = (date: Date, days: number) => {
    var date = new Date(date.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export const dateToString = (data: Date) => {
    let d = data.getDate()
    let m = data.getMonth() + 1
    return data.getFullYear() + "-" + (m < 10 ? "0"+m:m) + "-" + (d < 10 ? "0"+d:d);//yyyy-mm-dd
}

export const stringToDate = (dateString: string, separator: string, r:boolean = true) => { //r = yyyy-mm-dd, not r = dd-mm-yyyy
    let dA = dateString.split(separator)
    if(dA.length !== 3)
        throw new Error("Impossibile parsare data");

    return new Date(`${dA[ r?0:2 ]}-${dA[1]}-${dA[ r?2:0 ]}T00:00:00`);
}

export const xToDateString = (data: Date | string) => {
    if(data instanceof Date)
        return dateToString(data);
    else
        return data;
}

export const xToDate = (data: Date | string, separator:string = "-", r:boolean = true) => {
    if(data instanceof Date)
        return data;
    else
        return stringToDate(data, separator, r);
}

export const lastMonthDay = (m: number, year: number) => {
    switch(m) {
        case 4:
        case 6:
        case 9:
        case 11:
            return 30
        case 2:
            return (year%400 == 0) ? 29:((year%4==0 && year%100 !== 0)? 29:28)
        default:
            return 31;

    }
}

export const addYears = (data: Date, years: number) => {
    data.setFullYear(data.getFullYear() + years);
    return data;
}

export const checkData = (date: string, seaparator: string = "-") => {
    let arrdate = date.split(seaparator), x;
    if(arrdate.length !== 3) return false;
    try{
        stringToDate(date, seaparator);
    }catch(e){
        return false;
    }
    return true;
}