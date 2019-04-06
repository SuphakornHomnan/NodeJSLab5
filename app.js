
class Register {
    constructor(name, idcard, birth, gender, phone, email) {
        this.name = name;
        this.idcard = idcard;
        this.birth = birth;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
    }
}

class UI {
    static showRegister() {

        const reg = Store.getDetail();

        reg.forEach((r) => UI.addDetailToList(r));
    }


    //add detail
    static addDetailToList(reg) {
        const list = document.querySelector('#list');

        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${reg.name}</td>
      <td>${reg.idcard}</td>
      <td>${reg.birth}</td>
      <td>${reg.gender}</td>
      <td>${reg.phone}</td>
      <td>${reg.email}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
    `;

        list.appendChild(row);
    }
    //delete detail
    static deleteDetail(e) {
        if (e.classList.contains('delete')) {
            e.parentElement.parentElement.remove();
        }
    }

    //show alert  
    
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#my-form');
        container.insertBefore(div, form);

        // Vanish in 0.75 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 750);
    }

    //clear fields  
    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#id-card').value = '';
        document.querySelector('#birthday').value = '';
        document.querySelector('#gender').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('##email').value = '';
    }
}

//Handles Storage
class Store {
    static getDetail() {
        let details;
        if (localStorage.getItem('details') === null) {
            details = [];
        } else {
            details = JSON.parse(localStorage.getItem('details'));
        }

        return details;
    }

    static addDetail(detail) {
        const details = Store.getDetail();
        details.push(detail);
        localStorage.setItem('details', JSON.stringify(details));
    }

    static removeDetail(temp) {
        const details = Store.getDetail();

        details.forEach((detail, index) => {
            if (detail.temp === temp) {
                datails.splice(index, 1);
            }
        });

        localStorage.setItem('details', JSON.stringify(details));
    }
}

//Show Register
document.addEventListener('DOMContentLoaded', UI.showRegister);

//Add a Detail
document.querySelector('#my-form').addEventListener('submit', (e) => {

    e.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value;
    const idcard = document.querySelector('#idcard').value;
    const birth = document.querySelector('#birthday').value;
    const gender = document.querySelector('#gender').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;

    //Validate
    if (name === '' || idcard === '' || birth === '' || gender === '' || phone === '' || email === '') {
        UI.showAlert('Please fill in all fields', 'Warning');
    } else {
        
        const details = new Register(name,idcard,birth,gender,phone,email);
        

        //Add Detail to UI
        UI.addDetailToList(details);

        // Add Detail to store
        Store.addDetail(details);

        //Show success message
        UI.showAlert('Details Added', 'success');

        //Clear fields
        UI.clearFields();
    }
});

//Remove a Detail
document.querySelector('#my-form').addEventListener('click', (e) => {
  
  
  //Remove detail from UI
  UI.deleteDetail(e.target);

  // Remove detail from store
  Store.removeDetail(e.target.parentElement.previousElementSibling.textContent);

  //Show success message
  UI.showAlert('Detail Removed', 'success');
});
