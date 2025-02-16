/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
  .prompt([
    {
        name: "url",
        message: "Enter your url to be converted to a QR image:"
    }
  ])
  .then((answers) => {
    const url = answers.url;
    const qr_png = qr.image(url, {type: "png"});
    qr_png.pipe(fs.createWriteStream("qr_image.png"));
    fs.writeFile("url.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    console.error("Error: ", error);
  });