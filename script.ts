document.getElementById("resumeForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    const profilePhoto = document.getElementById(
      "profilePhoto"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;
const usernameElement = document.getElementById('username') as HTMLInputElement



    if (
      profilePhoto &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      usernameElement
    ) {
      const Name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

        const username = usernameElement.value;
        const uniquePath = `resume/${username.replace(/\s+/g, '_')}_cv.html`

      const profilePhotoFile = profilePhoto.files?.[0];
      const profilePhotoURL = profilePhotoFile
        ? URL.createObjectURL(profilePhotoFile)
        : "";

      console.log("Profile Photo URL:", profilePhotoURL);
      const resumeOutput = `
        <h2>Resume</h2>
        ${
          profilePhotoURL
            ? `<img src="${profilePhotoURL}" alt="Profile Photo" class="profilePicture">`
            : ""
        }
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${Name}</span></p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>

        <h3>Experience:</h3>
        <p id="edit-experience" class="editable">${experience}</p>

        <h3>Skills:</h3>
        <p id="edit-skills" class="editable">${skills}</p>
      `;

const downloadLink = document.createElement('a')
downloadLink.href = `data:text/html;charset=utf-8` + encodeURIComponent(resumeOutput)
downloadLink.download = uniquePath
downloadLink.textContent = `Download your 2024 resume`



      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable()
        resumeOutputElement.appendChild(downloadLink);
      } else {
        console.error("The resume output element is missing");
      }

      if (profilePhotoFile) {
        setTimeout(() => URL.revokeObjectURL(profilePhotoURL), 1000);
      }
    } else {
      console.error("One or more form elements are missing");
    }
  });

function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");

  editableElements.forEach((element) => {
    element.addEventListener("click", function () {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing-input");

        input.addEventListener("blur", function () {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}
