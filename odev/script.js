function mesajGonder() {
    var ad = document.getElementById('ad').value;
    if(ad == "") {
        alert("Lütfen adınızı giriniz!");
    } else {
        alert("Sayın " + ad + ", mesajınız başarıyla gönderildi! (Demo)");
    }
}

function resimAc(imgElement) {
    var modal = document.getElementById('modal');
    var modalImg = document.getElementById('buyukResim');
    
    modal.style.display = "flex";
    modalImg.src = imgElement.src;
}

function modalKapat() {
    document.getElementById('modal').style.display = "none";
}