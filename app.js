console.log('Hello World!');

document.getElementById('downloadResumeBtn').addEventListener('click', function() {
    alert('Resume downloaded successfully!');
});
//greetings 
// Function to create a greeting message
function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}


function displayGreeting() {
    const name = "Emmanuel"; // 
    const greetingMessage = showGreeting(name);
    document.getElementById('greeting').textContent = greetingMessage;
}

// Call displayGreeting when the page loads
window.onload = displayGreeting;






// Projects tab 

const projects = [
    {
      title: "J Performance Webpage",
      description: "Create a new webpage for a mechanics shop showcasing all of his work",
      deadline: "2024-12-31",
      imageURL: "./assets/j performance Small 2.jpeg" // replace with actual image path
    },
    {
      title: "Pro-hands Detailing Webpage",
      description: "A page dedicated to showcasing the amazing job of a detailing business",
      deadline: "2024-10-01",
      imageURL: "./assets/prohands.jpeg"  // replace with actual image path
    },
    {
      title: "Sauceda's Towing Webpage",
      description: "Create a page showing all the services provided, as well as the locations and free quotes.",
      deadline: "2024-11-15",
      imageURL: "./assets/towing.jpeg" // replace with actual image path
    }
  ];
  
  // Function to calculate countdown
  function calculateCountdown(deadline) {
    const deadlineDate = new Date(deadline).getTime();
    const now = new Date().getTime();
    const timeDiff = deadlineDate - now;
  
    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      return "Deadline passed";
    }
  }
  
  // Function to determine project status
  function getProjectStatus(deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    return deadlineDate > currentDate ? "Ongoing" : "Completed";
  }
  
  // Render the projects dynamically
  function renderProjects(projectArray) {
    const projectsList = $("#projects-ul");
    projectsList.empty(); // Clear existing projects
  
    projectArray.forEach((project) => {
      const countdown = calculateCountdown(project.deadline);
      const status = getProjectStatus(project.deadline);
      const statusClass = status === "Ongoing" ? "status ongoing" : "status completed";
  
      const projectCard = `
        <li class="project card">
          <img src="${project.imageURL}" alt="${project.title}" class="project-img" />
          <div class="project-details">
            <strong>Title:</strong> ${project.title} <br>
            <strong>Description:</strong> ${project.description} <br>
            <strong>Deadline:</strong> ${project.deadline} <br>
            <strong>Time Left:</strong> <span class="countdown">${countdown}</span> <br>
            <strong>Status:</strong> <span class="${statusClass}">${status}</span>
          </div>
        </li>
      `;
      projectsList.append(projectCard);
    });
  }
  
  // Sort and display projects by deadline
  function sortProjectsByDeadline(order = "asc") {
    projects.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    renderProjects(projects);
  }
  
  // Initial render
  $(document).ready(() => {
    renderProjects(projects);
  
    // Event listener for sorting
    $("#sort-order").on("change", function () {
      const sortOrder = $(this).val();
      sortProjectsByDeadline(sortOrder);
    });
  
    // Update countdown every second
    setInterval(() => {
      renderProjects(projects);
    }, 1000);
  });












  // skills section 


$(document).ready(function() {
    // Array to store skills
    const skills = [];

    // Check if a skill exists in the array
    const skillExists = (skill) => skills.includes(skill);

    // Update the skills list in the DOM
    const updateSkillsList = () => {
        $('#skills-ul').empty(); // Clear existing list
        skills.forEach((skill, index) => {
            $('#skills-ul').append(`
                <li class="skills-list-item" data-index="${index}">
                    <span class="skill-name">${skill}</span>
                    <span class="edit">Edit</span>
                    <span class="delete">Delete</span>
                </li>
            `);
        });
    };

    // Add Skill
    $('#skill-form').submit(function(event) {
        event.preventDefault();
        const skill = $('#skill-input').val().trim();
        
        if (skill && !skillExists(skill)) {
            skills.push(skill);
            $('#skill-input').val('');
            updateSkillsList();
            $('#skills-ul li:last').hide().fadeIn();
        } else {
            alert("Skill is either empty or already exists!");
        }
    });

    // Edit Skill
    $('#skills-ul').on('click', '.edit', function() {
        const index = $(this).closest('li').data('index');
        const newSkill = prompt("Edit skill:", skills[index]);
        
        if (newSkill && !skillExists(newSkill)) {
            skills[index] = newSkill;
            updateSkillsList();
        } else {
            alert("Skill is either empty or already exists!");
        }
    });

    // Remove Skill
    $('#skills-ul').on('click', '.delete', function() {
        const index = $(this).closest('li').data('index');
        $(this).closest('li').slideUp(400, function() {
            skills.splice(index, 1);
            updateSkillsList();
        });
    });
});









//times downloaded

  let downloadCount = 0; // Initialize download count

  // update download count
  function incrementDownloadCount() {
    downloadCount++; // Increment count
    document.getElementById('download-count').textContent = downloadCount; 
  }

 
  document.getElementById('downloadResumeBtn').addEventListener('click', function() {
    incrementDownloadCount(); 
  });










  // Ed and Experience table 

    // Arrays for education and experience
    const educationData = [
        { location: "Roger Williams University", degree: "Intro to Engineering - Student", duration: "06/27/2017 - 07/21/2017" },
        { location: "Seattle University", degree: "Zoology Course - Student", duration: "06/25/2018 - 07/20/2018" },
        { location: "Arizona Western College", degree: "CS Major - Student", duration: "08/2022 - 05/2024" }
      ];
  
      const experienceData = [
        { location: "Advance Call Center Technologies", position: "Customer Loyalty Group Representative", duration: "07/2022 - 08/2022" },
        { location: "O'Reilly Auto Parts", position: "Retail Service Specialist (RSS)", duration: "11/2022 - Present" }
      ];
  
      // Function to create rows for Education and Experience
      function populateTable() {
        const tableBody = document.getElementById('edu-exp-body');
  
        // Add Education data
        educationData.forEach((edu, index) => {
          const row = document.createElement('tr');
          if (index === 0) {
            row.innerHTML = `
              <td rowspan="${educationData.length}">Education</td>
              <td>${edu.location}</td>
              <td>${edu.degree}</td>
              <td>${edu.duration}</td>
            `;
          } else {
            row.innerHTML = `
              <td>${edu.location}</td>
              <td>${edu.degree}</td>
              <td>${edu.duration}</td>
            `;
          }
          tableBody.appendChild(row);
        });
  
        // Add Experience data
        experienceData.forEach((exp, index) => {
          const row = document.createElement('tr');
          if (index === 0) {
            row.innerHTML = `
              <td rowspan="${experienceData.length}">Experience</td>
              <td>${exp.location}</td>
              <td>${exp.position}</td>
              <td>${exp.duration}</td>
            `;
          } else {
            row.innerHTML = `
              <td>${exp.location}</td>
              <td>${exp.position}</td>
              <td>${exp.duration}</td>
            `;
          }
          tableBody.appendChild(row);
        });
      }
  
      // Call the function to populate the table
      populateTable();
    









      // dynamic rending 
$(document).ready(function() {
    // Step 2.1: Define the navigation menu items
    const navItems = [
        { text: "Home", href: "#home" },
        { text: "About me", href: "#about" },
        { text: "Projects", href: "#portfolio" },
        { text: "Skills", href: "#projectsSection" },
        { text: "Education/Experience", href: "#experience" },
        { text: "Contact me", href: "#contact" }
    ];

    // Step 2.2: Render the navigation menu items dynamically
    const $navList = $('#nav-items-list');
    navItems.forEach(item => {
        const $navItem = $(`
            <li>
                <a href="${item.href}" class="nav-link">${item.text}</a>
            </li>
        `);
        $navList.append($navItem);
    });

    // Step 2.3: Implement smooth scrolling
    $('a.nav-link').on('click', function(event) {
        event.preventDefault();
        const target = $(this).attr('href');

        $('html, body').animate(
            {
                scrollTop: $(target).offset().top
            },
            800 // Duration in milliseconds for the smooth scroll
        );
    });
});