function validateform() {
    var title=document.myform.title.value;  
    var description=document.myform.description.value;  

    if (title == null || title === "") {
        alert("Title tidak boleh kosong")
        return false
    } else if (description == null || description === "") {
        alert("Description tidak boleh kosong")
        return false
    } else {
        alert("Playlist berhasil dibuat")
        document.myform.title.value = "";
        document.myform.description.value = "";
        return false
    }
}