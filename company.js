/* NAV */
function goTo(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
}

/* UPDATE AVG */
function updateAvgSalary() {
  let salaries = document.querySelectorAll(
    "#empTable tbody tr td:nth-child(4)"
  );

  let total = 0;

  salaries.forEach((td) => {
    let salary = Number(td.innerText);

    if (!isNaN(salary)) {
      total += salary;
    }
  });

  if (salaries.length > 0) {
    let avg = total / salaries.length;

    document.getElementById("avgSalary").innerText =
      avg.toFixed(0);
  } else {
    document.getElementById("avgSalary").innerText = 0;
  }
}

/* decrease department count */
function decreaseDept(dept) {
  if (dept === "IT") {
    itCount.innerText--;
  }

  if (dept === "HR") {
    hrCount.innerText--;
  }

  if (dept === "Marketing") {
    mktCount.innerText--;
  }
}

/* delete employee */
function deleteEmployee(btn, dept) {
  btn.closest("tr").remove();

  empCount.innerText =
    Number(empCount.innerText) - 1;

  decreaseDept(dept);

  updateAvgSalary();
}

/* add employee */
function addEmployee() {
  let id = document.getElementById("id").value.trim();

  let name =
    document.getElementById("name").value.trim();

  let dept =
    document.getElementById("dept").value;

  let salary =
    document.getElementById("salary").value.trim();

  if (
    !id ||
    !name ||
    !dept ||
    !salary ||
    isNaN(Number(salary))
  ) {
    alert("Please enter valid data");
    return;
  }

  /* duplicate ID */
  let ids = document.querySelectorAll(
    "#empTable tbody tr td:first-child"
  );

  for (let i = 0; i < ids.length; i++) {
    if (ids[i].innerText == id) {
      alert("ID already exists");
      return;
    }
  }

  /* add row */
  document.querySelector("#empTable tbody").innerHTML += `
<tr>
<td>${id}</td>
<td>${name}</td>
<td>${dept}</td>
<td>${salary}</td>
<td>
<button onclick="deleteEmployee(this, '${dept}')">
Delete
</button>
</td>
</tr>
`;

  /* update counts */
  empCount.innerText =
    Number(empCount.innerText) + 1;

  if (dept === "IT") {
    itCount.innerText =
      Number(itCount.innerText) + 1;
  }

  if (dept === "HR") {
    hrCount.innerText =
      Number(hrCount.innerText) + 1;
  }

  if (dept === "Marketing") {
    mktCount.innerText =
      Number(mktCount.innerText) + 1;
  }

  updateAvgSalary();

  /* clear inputs */
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("dept").value = "";
  document.getElementById("salary").value = "";
}