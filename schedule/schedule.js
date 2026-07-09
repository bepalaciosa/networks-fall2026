// Load JSON and generate table when page loads
document.addEventListener('DOMContentLoaded', function() {
  fetch('schedule-data.json')
    .then(response => response.json())
    .then(schedule => {
      generateScheduleTable(schedule);
    })
    .catch(error => {
      console.error('Error loading schedule:', error);
    });
});
function generateScheduleTable(schedule) {
  const tbody = document.getElementById('schedule-body');
  schedule.forEach(weekData => {
    // Week header row
    const weekRow = tbody.insertRow();
    weekRow.className = 'week-header';
    weekRow.innerHTML = `
      <td><span class="week-title">Week ${weekData.week}</span></td>
      <td colspan="3"><span class="week-title">${weekData.topic}</span></td>
    `;
    // Day rows
    weekData.days.forEach(day => {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td>${day.date}</td>
        <td>${day.day_topic}</td>
        <td>${listItems(day.readings)}</td>
        <td>${listItems(day.assignments_due)}</td>
      `;
    });
  });
}
function listItems(items) {
  if (!items || items.length === 0) return '';
  
  let html = '<ul>';
  items.forEach(item => {
    if (item.url && item.url !== '#') {
      html += `<li><a href="${item.url}" target="_blank">${item.title}</a></li>`;
    } else {
      html += `<li>${item.title}</li>`;
    }
  });
  html += '</ul>';
  return html;
}
