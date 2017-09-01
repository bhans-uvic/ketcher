/****************************************************************************
 * Copyright (C) 2017 EPAM Systems
 *
 * This file is part of the Ketcher
 * The contents are covered by the terms of the BSD 3-Clause license
 * which is included in the file LICENSE.md, found at the root
 * of the Ketcher source tree.
 ***************************************************************************/

import 'babel-polyfill';
import 'whatwg-fetch';
import queryString from 'query-string';

import api from './api.js';
import * as molfile from './chem/molfile';
import * as smiles from './chem/smiles';

import ui from './ui';
import Render from './render';

function getSmiles() {
	return smiles.stringify(ketcher.editor.struct(),
	                        { ignoreErrors: true });
}

function getMolfile() {
	return molfile.stringify(ketcher.editor.struct(),
	                         { ignoreErrors: true });
}

function setMolecule(molString) {
	if (!(typeof molString === "string"))
		return;
	ketcher.ui.load(molString, {
		rescale: true
	});
}

function addFragment(molString) {
	if (!(typeof molString === "string"))
		return;
	ketcher.ui.load(molString, {
		rescale: true,
		fragment: true
	});
}

function showMolfile(clientArea, molString, options) {
	const render = new Render(clientArea, Object.assign({
		scale: options.bondLength || 75
	}, options));
	if (molString) {
		const mol = molfile.parse(molString);
		render.setMolecule(mol);
	}
	render.update();
	// not sure we need to expose guts
	return render;
}

// TODO: replace window.onload with something like <https://github.com/ded/domready>
// to start early
window.onload = function () {
	var params = queryString.parse(document.location.search);
	if (params.api_path)
		ketcher.apiPath = params.api_path;
	ketcher.server = api(ketcher.apiPath, {
		'smart-layout': true,
		'ignore-stereochemistry-errors': true,
		'mass-skip-error-on-pseudoatoms': false,
		'gross-formula-add-rsites': true
	});
	ketcher.ui = ui(Object.assign({}, params, buildInfo),
	                ketcher.server);
	ketcher.editor = global._ui_editor;
	ketcher.server.then(function () {
		if (params.mol)
			ketcher.ui.load(params.mol);
	}, function () {
		document.title += ' (standalone)';
	});
};

const buildInfo = {
	version: '__VERSION__',
	apiPath: '__API_PATH__',
	buildDate: '__BUILD_DATE__',
	buildNumber: '__BUILD_NUMBER__' || null,
	buildOptions: '__BUILD_OPTIONS__',
	miewPath: '__MIEW_PATH__' || null
};

const ketcher = module.exports = Object.assign({
	getSmiles: getSmiles,
	getMolfile: getMolfile,
	setMolecule: setMolecule,
	addFragment: addFragment,
	showMolfile: showMolfile
}, buildInfo);
