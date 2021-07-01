document.querySelector(".bottom-container")
.addEventListener("click", () => {
  let text = document.getElementById("filter-jobs").value
  getJobs().then(jobs => {
      let filteredJobs = filterJobs(jobs,text);
      showJobs(filteredJobs)
  })
})

function getJobs(){
   return fetch("data.json")
    .then( response => response.json())
    .then(data => {
        return data
    })
}

function filterJobs(jobs, searchText){

    if(searchText){
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText)
            || job.type.toLowerCase().includes(searchText)
            || job.company.toLowerCase().includes(searchText)
            || job.requirements.content.toLowerCase().includes(searchText)) {
                   return true;
             }else{
                 false;
             }
        })
        return filteredJobs;
    }else{
        return jobs;
    }


}

function showJobs(jobs){
    console.log(jobs)
    let jobsContainor = document.querySelector(".jobs-containor")
    console.log(jobsContainor)

    let jobsHTML = "";

    jobs.forEach(job => {
       jobsHTML += `
        <div class="job-tile">
            <div class="top">
                <img src="${job.logo}"/>
                <span class="material-icons more_horiz">more_horiz</span>
            </div>

            <div class="role-name">
                ${job.roleName}
            </div>

            <div class="discription">
                ${job.requirements.content}
            </div>
            <div class="buttons">
                <div class="button apply-now">
                    Apply Now
                </div>
                <div class="button">
                    Message
                </div>
            </div>

        </div>
       `
    });

   jobsContainor.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data)
});