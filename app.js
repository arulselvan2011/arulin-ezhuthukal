const KEY="arulin_sections";
const starter={
 id:"chennai-001",
 name:"முதல் இரண்டு பக்கங்கள்",
 content:`சென்னையை நோக்கி என் முதல் பயணம்

நான் பதினொன்றாம் வகுப்பு படித்துக் கொண்டிருந்த காலம். சென்னைக்கு ஒருமுறையாவது செல்ல வேண்டும் என்ற ஆசை நீண்ட நாட்களாக எனக்குள் இருந்தது.

ஒருநாள் என் தாத்தா என்னை சென்னைக்கு அழைத்துச் செல்வதாகச் சொன்னார். அப்போது அவருக்கு 77 வயது. அவருக்கு நடப்பதில் சிரமம் இருந்தாலும், என்னை அழைத்துச் செல்ல வேண்டும் என்ற ஆர்வம் இருந்தது.

வியாழக்கிழமை பள்ளிக்குச் சென்றிருந்தபோது, அன்று மாலை ரயிலில் சென்னைக்குப் புறப்படலாம் என்று தாத்தா தெரிவித்தார். அம்மாவும் சத்யாவும் வருவார்கள் என்று கூறினார்.

பள்ளியில் இருந்து என்னை அழைத்துச் செல்ல அப்பாவும் அண்ணனும் வந்தார்கள். தலைமை ஆசிரியர், உதவி தலைமை ஆசிரியர், விடுதி பொறுப்பாளர் மற்றும் தேவையான இடங்களில் அனுமதி/கையொப்பங்களைப் பெற்றோம்.

எனக்கு மிகவும் மகிழ்ச்சியாக இருந்தது. ஆனால் அந்த மகிழ்ச்சியை வெளியில் அதிகமாக காட்டாமல் இருந்தேன்.

வீட்டிற்குச் செல்லும் வழியில், விடுதி வருகை மற்றும் வெளியேறும் பதிவில் கையொப்பம் வாங்க மறந்துவிட்டது எனக்கு நினைவுக்கு வந்தது. அதை அப்பாவிடம் சொன்னேன்.

அப்பா என்னையும் அண்ணனையும் வாகனத்தில் மீண்டும் பள்ளிக்குச் செல்லச் சொன்னார். அவர் நடந்து வருவதாகச் சொன்னார்.

நான் பள்ளிக்குத் திரும்பி ஓடினேன். நண்பர்கள் நான் கையொப்பத்தை மறந்துவிட்டதைப் பற்றி கிண்டல் செய்தார்கள். நான் அதை ஒப்புக்கொண்டேன்.

பின்னர் வீட்டிற்குத் திரும்பினோம். அப்பாவும் அண்ணனும் வேலைக்குச் சென்றார்கள். மாலை 6 மணியளவில் புறப்படுவதற்காக நான் ஆவலுடன் காத்திருந்தேன்.

தொடரும்…`,
};
function getData(){
 let a=JSON.parse(localStorage.getItem(KEY)||"null");
 if(!a){a=[starter];localStorage.setItem(KEY,JSON.stringify(a));}
 return a;
}
function render(){
 const wrap=document.getElementById("sections"); if(!wrap)return;
 wrap.innerHTML="";
 getData().forEach(x=>{
   const d=document.createElement("div"); d.className="card"; d.textContent=x.name;
   d.onclick=()=>location.href="section.html?id="+encodeURIComponent(x.id);
   wrap.appendChild(d);
 });
}
function openAddForm(){
 document.getElementById("modal").classList.remove("hidden");
 document.getElementById("modalTitle").textContent="புதிய பகுதி";
 document.getElementById("sectionForm").reset();
}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
document.getElementById("sectionForm")?.addEventListener("submit",async e=>{
 e.preventDefault();
 const name=document.getElementById("name").value.trim();
 const content=document.getElementById("content").value;
 const imageFile=document.getElementById("image").files[0];
 const pdfFile=document.getElementById("pdf").files[0];
 const read=f=>new Promise(r=>{if(!f)r("");else{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(f)}});
 const item={id:"s-"+Date.now(),name,content,image:await read(imageFile),pdf:await read(pdfFile),pdfName:pdfFile?.name||""};
 const data=getData();data.push(item);localStorage.setItem(KEY,JSON.stringify(data));closeModal();render();
});
render();
