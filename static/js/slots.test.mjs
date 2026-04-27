

const  exampleText = 
  'document.querySelector("##Selector##").'+
  'textContent = "##Text##"'
const slots = [
  {
    label: "Selector", 
    type: "text"
  },
  {
    label: "Text",
    type: "text"
  }
];


const parts =
   exampleText.split(/(##.*?##)/);



for (const part of parts) {
  console.log(part);
}