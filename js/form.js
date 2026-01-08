const finputs = document.querySelectorAll(".form__input");
for (i = 0; i < finputs.length; i++) {
  finputs[i].addEventListener("input", updateformValue);
  finputs[i].nextElementSibling.children[1].textContent = finputs[i].getAttribute('maxl');
}

function updateformValue() {
  this.nextElementSibling.children[0].textContent = Math.max(0, Math.min(this.getAttribute('maxl'), this.value.length));
  if (this.value.length < this.getAttribute('minl')) {
    this.parentElement.classList.add('error');
    this.parentElement.classList.remove('success');
    this.nextElementSibling.classList.remove('success');
  } else {
    this.parentElement.classList.remove('error');
    this.parentElement.classList.add('success');
    this.nextElementSibling.classList.add('success');
  }
}

function isFormEmailValid(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function setErrorFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form__control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form__control success';
}

function setSelectErrorFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form__select error';
}

function setSelectSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form__select success';
}

// start validate form header
const form = document.getElementById('form');

if(form) {
  const username = document.getElementById('username');
  const phone = document.getElementById('phone');
  const text = document.getElementById('text');
  const price = document.getElementById('price');
  const сommunication = document.getElementById('сommunication');
  const usernameMin = username.getAttribute('minl');
  const usernameMax = username.getAttribute('maxl');
  const phoneMin = phone.getAttribute('minl');
  const phoneMax = phone.getAttribute('maxl');
  const textMin = text.getAttribute('minl');
  const textMax = text.getAttribute('maxl');
  username.oninput = function(){this.value = this.value.substr(0, usernameMax);}
  phone.oninput = function(){this.value = this.value.substr(0, phoneMax);}
  text.oninput = function(){this.value = this.value.substr(0, textMax);}
  form.addEventListener('submit', e => {
    e.preventDefault();
    checkFormInputs();
  });
  function checkFormInputs() {
    const usernameValue = username.value.trim();
    const phoneValue = phone.value.trim();
    const textValue = text.value.trim();
    const priceValue = price.value.trim();
    const сommunicationValue = сommunication.value.trim();
    
    if(usernameValue !== '' && usernameValue.length >= usernameMin && usernameValue.length <= usernameMax) {
      setSuccessFor(username);
    } else {
      setErrorFor(username);
    }
    if(phoneValue !== '' && phoneValue.length >= phoneMin && phoneValue.length <= phoneMax) {
      setSuccessFor(phone);
    } else {
      setErrorFor(phone);
    }
    if(textValue !== '' && textValue.length >= textMin && textValue.length <= textMax) {
      setSuccessFor(text);
    } else {
      setErrorFor(text);
    }
    if(priceValue !== '') {
      setSelectSuccessFor(price);
    } else {
      setSelectErrorFor(price);
    }
    if(сommunicationValue !== '') {
      setSelectSuccessFor(сommunication);
    } else {
      setSelectErrorFor(сommunication);
    }
    if(usernameValue !== '' && usernameValue.length >= usernameMin && usernameValue.length <= usernameMax && 
    phoneValue !== '' && phoneValue.length >= phoneMin && phoneValue.length <= phoneMax && 
    textValue !== '' && textValue.length >= textMin && textValue.length <= textMax &&
    priceValue !== '' && сommunicationValue !== '') {
      form.classList.add("hidden");
      document.getElementById('form__successfully_form').classList.add("active");
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          one: usernameValue,
          two: phoneValue,
          three: textValue,
          four: priceValue,
          five: сommunicationValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      });
    }
  }
}
// end validate form header

// start validate form career
const formcareer = document.getElementById('form__career');
if(formcareer) {
  const careerusername = document.getElementById('career__username');
  const careeremail = document.getElementById('career__email');
  const careerlink = document.getElementById('career__link');
  const careersocial = document.getElementById('career__social');
  const careerfile = document.getElementById('career__file');
  const careerusernameMin = careerusername.getAttribute('minl');
  const careerusernameMax = careerusername.getAttribute('maxl');
  const careeremailMin = careeremail.getAttribute('minl');
  const careeremailMax = careeremail.getAttribute('maxl');
  const careerlinkMin = careerlink.getAttribute('minl');
  const careerlinkMax = careerlink.getAttribute('maxl');
  const careersocialMin = careersocial.getAttribute('minl');
  const careersocialMax = careersocial.getAttribute('maxl');
  careerusername.oninput = function(){this.value = this.value.substr(0, careerusernameMax);}
  careeremail.oninput = function(){this.value = this.value.substr(0, careeremailMax);}
  careerlink.oninput = function(){this.value = this.value.substr(0, careerlinkMax);}
  careersocial.oninput = function(){this.value = this.value.substr(0, careersocialMax);}

  careeremail.addEventListener('input', function () {
    const careeremailValid = careeremail.value.trim();
    this.nextElementSibling.children[0].textContent = Math.max(0, Math.min(this.getAttribute('maxl'), this.value.length));
    if (this.value.length < this.getAttribute('minl')) {
      this.parentElement.classList.add('error');
      this.parentElement.classList.remove('success');
      this.nextElementSibling.classList.remove('success');
    } else if (!isFormEmailValid(careeremailValid)) {
      this.parentElement.classList.add('error');
      this.parentElement.classList.remove('success');
      this.nextElementSibling.classList.remove('success');
    } else {
      this.parentElement.classList.remove('error');
      this.parentElement.classList.add('success');
      this.nextElementSibling.classList.add('success');
    }
  })

  formcareer.addEventListener('submit', e => {
    e.preventDefault();
    checkCareerInputs();
  });

  function checkCareerInputs() {
    const careerusernameValue = careerusername.value.trim();
    const careeremailValue = careeremail.value.trim();
    const careerlinkValue = careerlink.value.trim();
    const careersocialValue = careersocial.value.trim();
    const careerfileValue = careerfile.value.trim();
  
    if(careerusernameValue !== '' && careerusernameValue.length >= careerusernameMin && careerusernameValue.length <= careerusernameMax) {
      setSuccessFor(careerusername);
    } else {
      setErrorFor(careerusername);
    }
    if(!isFormEmailValid(careeremailValue)) {
      setErrorFor(careeremail);
    } else if (careeremailValue !== '' && careeremailValue.length >= careeremailMin && careeremailValue.length <= careeremailMax) {
      setSuccessFor(careeremail);
    } else {
      setErrorFor(careeremail);
    }
    if(careersocialValue !== '' && careersocialValue.length >= careersocialMin && careersocialValue.length <= careersocialMax) {
      setSuccessFor(careersocial);
    } else {
      setErrorFor(careersocial);
    }
    if(careerlinkValue !== '' && careerlinkValue.length >= careerlinkMin && careerlinkValue.length <= careerlinkMax) {
      setSuccessFor(careerlink);
    } else if(careerfileValue !== '') {
      setSuccessFor(careerlink);
    } else {
      setErrorFor(careerlink);
    }
  
    if(!isFormEmailValid(careeremailValue)) {
      setErrorFor(careeremail);
    } else if(careerusernameValue !== '' && careerusernameValue.length >= careerusernameMin && careerusernameValue.length <= careerusernameMax && 
    careeremailValue === '' && careeremailValue.length >= careeremailMin && careeremailValue.length <= careeremailMax && 
    careerlinkValue !== '' && careerlinkValue.length >= careerlinkMin && careerlinkValue.length <= careerlinkMax && 
    careersocialValue !== '' && careersocialValue.length >= careersocialMin && careersocialValue.length <= careersocialMax) {
      formcareer.classList.add("hidden");
      document.getElementById('form__successfully_form__career').classList.add("active");
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          one: careerusernameValue,
          two: careeremailValue,
          three: careerlinkValue,
          four: careersocialValue,
          five: careerfileValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    } else if(careerusernameValue !== '' && careerusernameValue.length >= careerusernameMin && careerusernameValue.length <= careerusernameMax && 
    careeremailValue !== '' && careeremailValue.length >= careeremailMin && careeremailValue.length <= careeremailMax &&  
    careersocialValue !== '' && careersocialValue.length >= careersocialMin && careersocialValue.length <= careersocialMax && 
    careerfileValue !== '') {
      formcareer.classList.add("hidden");
      document.getElementById('form__successfully_form__career').classList.add("active");
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          one: careerusernameValue,
          two: careeremailValue,
          three: careerlinkValue,
          four: careersocialValue,
          five: careerfileValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    }
  }

  var filesToUpload = [];
  const fileInput = document.getElementById('career__file');
  const fileContainer = document.getElementById('form__file_container');

  function filesObserver(el, callback){
      var done = function (){callback(el);};
      var observer = new MutationObserver(done);
      observer.observe(el, {childList: true, characterDataOldValue: true});
  };

  filesObserver(fileContainer, function (){
    if (fileContainer.children[1]) {
      fileContainer.children[0].remove();
    }
  });

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0';
    } else {
      var k = 1024;
      var dm = decimals < 0 ? 0 : decimals;
      var sizes = ['B', 'Kb', 'Mb', 'Gb', 'Tb'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  }

  fileInput.addEventListener('change', (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      let myFile = e.target.files[i];
      let myFileID = "FID" + (1000 + Math.random() * 9000).toFixed(0);
      let myFileSize = formatBytes(e.target.files[i].size);

      filesToUpload.push({
        file: myFile,
        FID: myFileID,
        filesize: myFileSize
      });
    };
    displayFiles();
    // e.target.value = null;
  });

  function removeFile(x) {
    fileInput.value = "";
    fileContainer.children[0].remove();
    // for (let i = 0; i < filesToUpload.length; i++) {
    //   if (filesToUpload[i].FID === x) {
    //     filesToUpload.splice(i, 1);
    //   }
    // }
    // displayFiles();
  }

  function displayFiles() {
    fileContainer.innerHTML = "";
    for (let i = 0; i < filesToUpload.length; i++) {
      fileContainer.innerHTML += `<li class="form__file_item"><span class="form__file_name">${filesToUpload[i].file.name}</span><span class="form__file_size">${filesToUpload[i].filesize}</span><a onclick="removeFile('${filesToUpload[i].FID}')"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 17L12 12M12 12L17 7.00001M12 12L7 7M12 12L17 17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>`;
    }
  }
}
// end validate form career

// start validate form feedback
const formfeedback = document.getElementById('form__feedback');
if(formfeedback) {
  const feedbackusername = document.getElementById('feedback__username');
  const feedbackphone = document.getElementById('feedback__phone');
  const feedbacksocial = document.getElementById('feedback__social');
  const feedbackusernameMin = feedbackusername.getAttribute('minl');
  const feedbackusernameMax = feedbackusername.getAttribute('maxl');
  const feedbackphoneMin = feedbackphone.getAttribute('minl');
  const feedbackphoneMax = feedbackphone.getAttribute('maxl');
  const feedbacksocialMin = feedbacksocial.getAttribute('minl');
  const feedbacksocialMax = feedbacksocial.getAttribute('maxl');
  feedbackusername.oninput = function(){this.value = this.value.substr(0, feedbackusernameMax);}
  feedbackphone.oninput = function(){this.value = this.value.substr(0, feedbackphoneMax);}
  feedbacksocial.oninput = function(){this.value = this.value.substr(0, feedbacksocialMax);}

  formfeedback.addEventListener('submit', e => {
    e.preventDefault();
    checkfeedbackInputs();
  });

  function checkfeedbackInputs() {
    const feedbackusernameValue = feedbackusername.value.trim();
    const feedbackphoneValue = feedbackphone.value.trim();
    const feedbacksocialValue = feedbacksocial.value.trim();
  
    if(feedbackusernameValue !== '' && feedbackusernameValue.length >= feedbackusernameMin && feedbackusernameValue.length <= feedbackusernameMax) {
      setSuccessFor(feedbackusername);
    } else {
      setErrorFor(feedbackusername);
    }
    if(feedbackphoneValue !== '' && feedbackphoneValue.length >= feedbackphoneMin && feedbackphoneValue.length <= feedbackphoneMax) {
      setSuccessFor(feedbackphone);
    } else {
      setErrorFor(feedbackphone);
    }
    if(feedbacksocialValue !== '' && feedbacksocialValue.length >= feedbacksocialMin && feedbacksocialValue.length <= feedbacksocialMax) {
      setSuccessFor(feedbacksocial);
    } else {
      setErrorFor(feedbacksocial);
    }
  
    if(feedbackusernameValue !== '' && feedbackusernameValue.length >= feedbackusernameMin && feedbackusernameValue.length <= feedbackusernameMax && 
    feedbackphoneValue !== '' && feedbackphoneValue.length >= feedbackphoneMin && feedbackphoneValue.length <= feedbackphoneMax && 
    feedbacksocialValue !== '' && feedbacksocialValue.length >= feedbacksocialMin && feedbacksocialValue.length <= feedbacksocialMax) {
      formfeedback.classList.add("hidden");
      document.getElementById('form__successfully_form__feedback').classList.add("active");
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          one: feedbackusernameValue,
          two: feedbackphoneValue,
          three: feedbacksocialValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    }
  }
}
// end validate form feedback

// start validate form subscription
const formsubscription = document.getElementById('form__subscription');

if(formsubscription) {
  const subscriptionemail = document.getElementById('subscription__email');
  const subscriptionemailMin = subscriptionemail.getAttribute('minl');
  const subscriptionemailMax = subscriptionemail.getAttribute('maxl');
  subscriptionemail.oninput = function(){this.value = this.value.substr(0, subscriptionemailMax);}

  subscriptionemail.addEventListener('input', function () {
    const subscriptionemailValid = subscriptionemail.value.trim();
    this.nextElementSibling.children[0].textContent = Math.max(0, Math.min(this.getAttribute('maxl'), this.value.length));
    if (this.value.length < this.getAttribute('minl')) {
      this.parentElement.classList.add('error');
      this.parentElement.classList.remove('success');
      this.nextElementSibling.classList.remove('success');
    } else if (!isFormEmailValid(subscriptionemailValid)) {
      this.parentElement.classList.add('error');
      this.parentElement.classList.remove('success');
      this.nextElementSibling.classList.remove('success');
    } else {
      this.parentElement.classList.remove('error');
      this.parentElement.classList.add('success');
      this.nextElementSibling.classList.add('success');
    }
  })

  formsubscription.addEventListener('submit', e => {
    e.preventDefault();
    checkFormSubscriptionInputs();
  });
  function checkFormSubscriptionInputs() {
    const subscriptionemailValue = subscriptionemail.value.trim();
    
    if(!isFormEmailValid(subscriptionemailValue)) {
      setErrorFor(subscriptionemail);
    } else if (subscriptionemailValue !== '' && subscriptionemailValue.length >= subscriptionemailMin && subscriptionemailValue.length <= subscriptionemailMax) {
      setSuccessFor(subscriptionemail);
    } else {
      setErrorFor(subscriptionemail);
    }
    if(!isFormEmailValid(subscriptionemailValue)) {
    } else if (subscriptionemailValue !== '' && subscriptionemailValue.length >= subscriptionemailMin && subscriptionemailValue.length <= subscriptionemailMax) {
      fetch('/ajax/sendMail.php', {
        method: 'POST',
        body: JSON.stringify({
          one: subscriptionemailValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    }
  }

  const apinput = [...document.querySelectorAll('.articles_page__checks .articles_page__check_input')];
  const apcheck = document.querySelectorAll('.articles_page__checks .articles_page__check');

  apinput.forEach(input => input.addEventListener('input', function(event) {
    if (event.target.checked) {
      for(var i = 0;i < apcheck.length; i++) {apcheck[i].classList.remove('active');}
      event.target.closest('.articles_page__check').classList.add('active');
    }
  }))
}
// end validate form subscription