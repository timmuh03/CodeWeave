

const templateText = 
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
  templateText.split(/(##.*?##)/);



for (const part of parts) {
  console.log(part);
}