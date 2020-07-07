export default {
    getTimestamp (){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep','Oct','Nov','Dec']


    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getYear() + 1900;
    let hour = new Date().getHours()
    let mins = new Date().getMinutes()

    let timestamp = months[month-1]+"  "+date+ "  at  "+hour+":"+mins+",   " + year
    return timestamp


	return timestamp
    }	
}
