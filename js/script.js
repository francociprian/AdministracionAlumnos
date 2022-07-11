////////////////////////
// VARIABLES GLOBALES //
////////////////////////

var firstNameInput = $("#nombreAlumno")
var lastNameInput = $("#apellidoAlumno")
var dniInput = $("#dniAlumno")
var submitButton = $("#botonAgregar")
var deleteButton = $("#botonEliminar")
var emailInput = $("#emailAlumno")
var deleteStudentInput = $("#eliminarAlumno")
var searchStudentInput = $("#buscarAlumno")
var searchButton = $("#botonBuscar")
var studentListParentNode = $("#mainList")

//////////////////////////
// VALIDADORES DE DATOS //
//////////////////////////

function nameValidator(input) {
    $(input).blur(function () {
        if (input.val() === "" ||
            input.val().indexOf('0') >= 0 ||
            input.val().indexOf('1') >= 0 ||
            input.val().indexOf('2') >= 0 ||
            input.val().indexOf('3') >= 0 ||
            input.val().indexOf('4') >= 0 ||
            input.val().indexOf('5') >= 0 ||
            input.val().indexOf('6') >= 0 ||
            input.val().indexOf('7') >= 0 ||
            input.val().indexOf('8') >= 0 ||
            input.val().indexOf('9') >= 0) {
            $(input).addClass("is-invalid");
            submitButtonValidatorBad()
        } else {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid")
            submitButtonValidatorGood()
        }
    });
}

function dniValidator(input) {
    $(input).blur(function () {
        if (input.val() === "" || searchStudentByDni(input.val(), "Student") == true || input.val() <= 0) {
            $(input).addClass("is-invalid");
            $(input).removeClass("is-valid");
            submitButtonValidatorBad()
        } else {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid");
            submitButtonValidatorGood()
        }
    });
}

function deleteStudentValidator(input) {
    $(input).blur(function () {
        if (input.val() === "" || searchStudentByDni(input.val(), "Student") != true) {
            $(input).addClass("is-invalid");
            $(input).removeClass("is-valid");
        } else {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid");
            $(deleteButton).removeAttr('disabled');
        }
    });
}

function emailValidator(input) {
    $(input).blur(function () {
        if (input.val() !== "" && input.val().indexOf("@") >= 0 && input.val().indexOf(".") >= 0) {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid");
            submitButtonValidatorGood()
        } else {
            $(input).addClass("is-invalid");
            submitButtonValidatorBad()
        }
    });
}

function searchStudentValidator(input) {
    $(input).blur(function () {
        if (input.val() === "" ||
            input.val().indexOf('0') >= 0 ||
            input.val().indexOf('1') >= 0 ||
            input.val().indexOf('2') >= 0 ||
            input.val().indexOf('3') >= 0 ||
            input.val().indexOf('4') >= 0 ||
            input.val().indexOf('5') >= 0 ||
            input.val().indexOf('6') >= 0 ||
            input.val().indexOf('7') >= 0 ||
            input.val().indexOf('8') >= 0 ||
            input.val().indexOf('9') >= 0) {
            $(input).addClass("is-invalid");
            $(searchButton).attr('disabled', true);
        } else {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid")
            $(searchButton).removeAttr('disabled');
        }
    });
}


function submitButtonValidatorGood() {
    if ($(firstNameInput).hasClass("is-valid") && $(dniInput).hasClass('is-valid') && $(emailInput).hasClass('is-valid')) {
        $(submitButton).removeAttr('disabled');
    }
}

function submitButtonValidatorBad() {
    if ($(firstNameInput).hasClass('is-invalid') || $(dniInput).hasClass('is-invalid')) {
        $(submitButton).attr('disabled', true);
    }
}


nameValidator(firstNameInput)
nameValidator(lastNameInput)
searchStudentValidator(searchStudentInput)
dniValidator(dniInput)
deleteStudentValidator(deleteStudentInput)
emailValidator(emailInput)

////////////////////////////
// CREADOR DE NODO ALUMNO //
////////////////////////////

function studentNodeCreator(parentNode) {
    $(parentNode).append(`
    <li class="list-group-item" id="${dniInput.val()}"> 
        <h1>${firstNameInput.val()} ${lastNameInput.val()}</h1>
        <h2>DNI: ${dniInput.val()}</h2>
        <h3>Email: ${emailInput.val()}</h3>
    </li>`);
}

$(submitButton).click(function () {
    studentNodeCreator(studentListParentNode)
    setLocalStudent()
    $(firstNameInput).removeClass('is-valid');
    $(firstNameInput).val('');
    $(lastNameInput).removeClass('is-valid');
    $(lastNameInput).val('');
    $(dniInput).removeClass('is-valid');
    $(dniInput).val('');
    $(emailInput).removeClass('is-valid');
    $(emailInput).val('');
    $(submitButton).attr('disabled', true)
});

///////////////////////////////////////
// BAJADA DE ALUMNO DE LOCAL STORAGE //
///////////////////////////////////////

function getLocalStudent(index, parentNode) {
    var gettedStudents = localStorage.getItem(index)
    var parsedStudents = JSON.parse(gettedStudents)
    if (parsedStudents == null) {
        console.log("No hay alumnos almacenados en localStorage")
    } else {
        for (let i = 0; i < parsedStudents.length; i++) {
            var student = parsedStudents[i];
            $(parentNode).append(`
            <li class="list-group-item" id="${student.dni}">
                <h1>${student.firstName} ${student.lastName}</h1>
                <h2>DNI: ${student.dni}</h2>
                <h3>Email: ${student.email}</h3>
            </li>`);
        }
    }
}

getLocalStudent("Student", studentListParentNode)

//////////////////////////////////////
// SUBIDA DE ALUMNO A LOCAL STORAGE //
//////////////////////////////////////

function setLocalStudent() {
    var gettedStudents = localStorage.getItem("Student")
    var parsedStudents = JSON.parse(gettedStudents)

    if (parsedStudents == null) {
        parsedStudents = []
    }

    var studentObject = {
        firstName: firstNameInput.val(),
        lastName: lastNameInput.val(),
        dni: dniInput.val(),
        email: emailInput.val(),
        id: dniInput.val()
    }

    parsedStudents.push(studentObject)
    var stringifiedObject = JSON.stringify(parsedStudents)
    localStorage.setItem("Student", stringifiedObject)
}

/////////////////////////////////
// BUSQUEDA DE ALUMNOS POR DNI //
/////////////////////////////////

function searchStudentByDni(input, index) {
    var gettedStudents = localStorage.getItem(index)
    var parsedStudents = JSON.parse(gettedStudents)
    var parsedStudents = JSON.parse(gettedStudents)

    if (parsedStudents == null) {
        parsedStudents = []
    }

    for (let i = 0; i < parsedStudents.length; i++) {
        const studentDni = parsedStudents[i].dni;
        if (studentDni === input) {
            return true
        }
    }
}

/////////////////////
// ELIMINAR ALUMNO //
/////////////////////

function deleteStudentByDni(input, index) {
    var gettedStudents = localStorage.getItem(index)
    var parsedStudents = JSON.parse(gettedStudents)
    var studentNode = document.getElementById(deleteStudentInput.val())

    $(studentNode).remove()

    for (let i = 0; i < parsedStudents.length; i++) {
        const student = parsedStudents[i];

        console.log(input.val())

        if (student.dni === deleteStudentInput.val()) {
            parsedStudents = parsedStudents.filter(function (student) {
                var newArray = student.dni !== deleteStudentInput.val()
                return newArray
            })
            localStorage.setItem("Student", JSON.stringify(parsedStudents));
        }
    }
}

$(deleteButton).click(function () {
    $.confirm({
        theme: 'modern',
        title: 'Eliminar alumno',
        content: 'Esta seguro de que desea eliminar a este alumno?',
        buttons: {
            confirmar: function () {
                deleteStudentByDni(studentListParentNode, 'Student')
                $(deleteStudentInput).removeClass('is-valid');
                $(deleteStudentInput).val('');
                $(deleteButton).attr('disabled', true);
            },
            cancelar: function () {
                $.alert('Cancelado');
            }
        }
    });
});

///////////////////
// BUSCAR ALUMNO //
///////////////////

function searchStudent(input, index) {
    var gettedStudents = localStorage.getItem(index)
    var parsedStudents = JSON.parse(gettedStudents)

    for (let i = 0; i < parsedStudents.length; i++) {
        var nombreAlumnos = parsedStudents[i].firstName.toLowerCase()
        if (nombreAlumnos.indexOf(input.val().toLowerCase()) >= 0) {
            $("#searchList").append(`
            <li class="list-group-item">
                <h1>${parsedStudents[i].firstName} ${parsedStudents[i].lastName}</h1>
                <h2>DNI: ${parsedStudents[i].dni}</h2>
                <h3>Email: ${parsedStudents[i].email}</h3>
            </li>`);
        }
    }
}

$(searchButton).click(function () {
    searchStudent(searchStudentInput, 'Student')
});

////////////////////////
// ANIMACIONES JQUERY //
////////////////////////

$(".list-group-item").hover(function () {
    $(this).addClass('active');
}, function () {
    $(this).removeClass('active');
});