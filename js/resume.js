var parm;
var parmValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  parm=query[i].split("=");
  parmValue=parseInt(parm[1]);
}
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
var info=storeDB.get(parmValue);
info.onsuccess=function (data) {
  console.log(data.target.result);
  display(data.target.result);

}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data) {
  var img=document.createElement("img");
  img.src="images/girl.svg";
  left.append(img);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  var h2=document.createElement("h2");
  h2.textContent=data.role;
  left.append(h2);
  var h1=document.createElement("h1");
  h1.textContent=data.email;
  left.append(h1);
  var h4=document.createElement("h4");
  h4.textContent=data.phoneno;
  left.append(h4);
  //right div
  var head=document.createElement("h2");
  head.textContent="career objective";
  right.append(head);
  var pc=document.createElement("p");
  pc.textContent=data.career;
  var head1=document.createElement("h1");
  head1.textContent="education details";
  right.append(head1);
  var table=document.createElement('table');
  table.border="3"
  let row='';
    let field="<tr>"+"<th>"+"college"+"</th>"+"<th>"+"degree"+"</th>"+"<th>"+"branch"+"</th>"+"<th>"+"marks"+"</th>"+"</th>";
  for(i in data.education){
    row+="<tr>"+"<td>"+data.education[i].college+"</td>"+"<td>"+data.education[i].degree+"</td>"+"<td>"+data.education[i].branch+"</td>"+"<td>"+data.education[i].marks+"</td>"+"</tr>";
  }
  table.innerHTML=field+row;
  right.appendChild(table);
  var hr=document.createElement("h2");
  hr .textContent="Technical skils";
  right.append(hr);
  var head2 =document.createElement("h1");
  head2.textContent=data.skils;
  right.append(head2);


}
