var _a;
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var profilePhoto = document.getElementById("profilePhoto");
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var experienceElement = document.getElementById("experience");
    var skillsElement = document.getElementById("skills");
    var usernameElement = document.getElementById('username');
    if (profilePhoto &&
        nameElement &&
        emailElement &&
        phoneElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        usernameElement) {
        var Name = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var username = usernameElement.value;
        var uniquePath = "resume/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        var profilePhotoFile = (_a = profilePhoto.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePhotoURL_1 = profilePhotoFile
            ? URL.createObjectURL(profilePhotoFile)
            : "";
        console.log("Profile Photo URL:", profilePhotoURL_1);
        var resumeOutput = "\n        <h2>Resume</h2>\n        ".concat(profilePhotoURL_1
            ? "<img src=\"".concat(profilePhotoURL_1, "\" alt=\"Profile Photo\" class=\"profilePicture\">")
            : "", "\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(Name, "</span></p>\n        <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n\n        <h3>Education</h3>\n        <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n        <h3>Experience:</h3>\n        <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n        <h3>Skills:</h3>\n        <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n      ");
        var downloadLink = document.createElement('a');
        downloadLink.href = "data:text/html;charset=utf-8" + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = "Download your 2024 resume";
        var resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
            resumeOutputElement.appendChild(downloadLink);
        }
        else {
            console.error("The resume output element is missing");
        }
        if (profilePhotoFile) {
            setTimeout(function () { return URL.revokeObjectURL(profilePhotoURL_1); }, 1000);
        }
    }
    else {
        console.error("One or more form elements are missing");
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement("input");
                input_1.type = "text";
                input_1.value = currentValue;
                input_1.classList.add("editing-input");
                input_1.addEventListener("blur", function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = "inline";
                    input_1.remove();
                });
                currentElement.style.display = "none";
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
