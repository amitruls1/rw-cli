import psi from "psi";
import Listr from "listr";

const executePageSpeed = async (
  url = "https://google.com",
  device = "desktop"
) => {
  const PSI_JOB = new Listr([
    {
      title: `Running page speed job at ${url} via ${device} strategy`,
      task: () => runPSI(url, device),
    },
  ]);
  await PSI_JOB.run();
};

const runPSI = async (url, device) => {
  // Output a formatted report to the terminal
  await psi.output(url, { strategy: device });
};

export default executePageSpeed;
