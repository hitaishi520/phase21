var request;
var idb= window.indexedDB||window.mozIndexedDB||window.msIndexedDB||window.webkitIndexedDB;
var open=idb.open("storeData",1);
console.log("IndexedDB is created");

open.onupgradeneeded=function(event){
var request=event.target.result;
var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error) {
console.log("object store is not created",+error);
}
open.onsuccess=function(event) {
request=event.target.result;
var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");

var finalData=storeDB.getAll();
finalData.onsuccess=function(event){
  var result=event.target.result;
  console.log(result);
  display(event.target.result);

}
}

function display(data) {
  var main=document.querySelector(".main");
  for (var i = 0; i < data.length; i++) {
    var child=document.createElement("div");
    child.classList.add("child");

    var image=document.createElement("img");
    image.src="images/girl.svg";

    image.alt=data[i].name;

    var h2=document.createElement("h2");
    h2.textContent=data[i].name;

    var role=document.createElement("h2");
    role.textContent=data[i].role;
    var email=document.createElement("h3");
    email.textContent=data[i].email;
    var x=document.createElement("a");
    x.href="resume.html?id="+data[i].id;
    x.textContent="view profie";
    child.append(image);
    child.append(x);
    child.append(role);
    child.append(email);
    main.append(child);




  }


}
