import { getAllStudents } from "./api.js";
import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { studentsTemplate } from './studentsTemp.js';
import { search } from './search.js';

let tableBody = document.querySelector('.container tbody');
let studentsData = await getAllStudents();
let template = studentsTemplate(Object.values(studentsData));
render(template, tableBody);

let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', search);
