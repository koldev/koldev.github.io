import * as intervalTest from "./interval.test.js";
import * as databaseTest from "./database.test.js";

async function main() {
  // Prepare the page
  const progressBarBorder = document.createElement("div");
  progressBarBorder.style.border = "solid 1px gray";
  document.body.append(progressBarBorder);
  const progressBar = document.createElement("div");
  progressBar.style.width = "0";
  progressBar.style.height = "25px";
  progressBar.style.backgroundColor = "green";
  progressBar.style.color = "white";
  progressBar.style.textAlign = "center";
  progressBar.style.lineHeight = progressBar.style.height;
  progressBarBorder.append(progressBar);
  const stats = document.createElement("div");
  stats.style.marginTop = "10px";
  document.body.append(stats);
  const failuresList = document.createElement("div");
  failuresList.style.marginTop = "10px";
  document.body.append(failuresList);

  // Select the tests to run
  const tests = [
    intervalTest,
    databaseTest
  ];
  const totalTestCount = tests.reduce((n, test) => n + Object.values(test).filter(value => value instanceof Function).length, 0);

  // Run the selected tests
  let testCount = 0;
  let failedTestCount = 0;
  for (const test of tests) {
    let testFailed = false;
    for (const entry of Object.entries(test)) {
      if (entry[1] instanceof Function) {
        try {
          if (entry[1].constructor.name === "Function") {
            entry[1]();
          } else if (entry[1].constructor.name === "AsyncFunction") {
            await entry[1]();
          }
        } catch (error) {
          const error2 = error instanceof Error ? error : new Error(`${error}`);
          if (!testFailed) {
            const testLink = document.createElement("a");
            testLink.href = test.url;
            testLink.target = "_blank";
            testLink.textContent = test.url.match(/[^\/]+\.js/)?.[0] ?? test.url;
            failuresList.append(testLink);
            console.error(testLink.textContent);
            testFailed = true;
          }
          const testError = document.createElement("div");
          testError.textContent = `${entry[0]}: ${error2.message}`;
          testError.style.marginLeft = "50px";
          failuresList.append(testError);
          console.error(testError.textContent);
          console.error(error2.stack);
          if (failedTestCount === 0) {
            progressBar.style.backgroundColor = "red";
          }
          ++failedTestCount;
        }
        ++testCount;
        const progress = `${100 * testCount / totalTestCount}%`;
        progressBar.textContent = progress;
        progressBar.style.width = progress;
        stats.textContent = `Tests run: ${testCount}, failed: ${failedTestCount}, total: ${totalTestCount}`;
      }
    }
  }
}

main();
