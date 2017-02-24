import { h, Component, render } from 'preact';
/** @jsx h */

import Dialog from '../component/dialog';
import StructEditor from '../component/structeditor';
import Vec2 from '../../util/vec2'

class Attach extends Component {
	constructor(props) {
		super(props);
		this.tmpl = props.normTmpl;
		this.editorOpts = {
			selectionStyle: { fill: '#47b3ec', stroke: 'none' },
			highlightStyle: { 'stroke': '#304ff7', 'stroke-width': 1.2 },
			scale: (props.scale > 15) ? props.scale : 15
		};

		this.setState( {
			attach: {
				atomid: +this.tmpl.props.atomid || 0,
				bondid: +this.tmpl.props.bondid || 0
			}
		});
	}

	result() {
		return this.state.attach;
	}

	onAttach(attachPoints) {
		this.setState({
			attach: attachPoints
		});
	}

	render() {
		let {attach} = this.state;
		let {userOpts} = this.props;
		return (
			<Dialog caption="Template Edit"
					name="attach" result={() => this.result() }
					params={this.props}
					buttons={["Cancel", "OK"]} className="attach">
				<label>Template Name:
					<input type="text" value={this.tmpl.struct.name || ''} placeholder="tmpl" disabled/>
				</label>
				<label>Choose attachment atom and bond:</label>
				<StructEditor className="struct-editor" struct={this.tmpl.struct} opts={userOpts}
							  onEvent={ (eName, ap) =>  (eName == 'attachEdit') ? this.onAttach(ap) : null }
							  /* tool = {name: .. , opts: ..} */ tool={{ name: 'attach', opts: attach }}
							  options={this.editorOpts}/>
				<label><b>&#123; atomid: {attach.atomid || 0}; bondid: {attach.bondid || 0} &#125;</b></label>
			</Dialog>
		);
	}
}

function structNormalization(struct) {
	let min = new Vec2(struct.atoms.get(0).pp);
	let max = new Vec2(struct.atoms.get(0).pp);
	struct.atoms.each(function (aid, atom) {
		if (atom.pp.x < min.x) min.x = atom.pp.x;
		if (atom.pp.y < min.y) min.y = atom.pp.y;
		if (atom.pp.x > max.x) max.x = atom.pp.x;
		if (atom.pp.y > max.y) max.y = atom.pp.y;
	});
	struct.atoms.each(function (aid, atom) {
		atom.pp = Vec2.diff(atom.pp, min);
	});
	max = Vec2.diff(max, min);

	return (max.x > max.y) ? max.x : max.y;
}

export default function dialog(params) {
	let overlay = $$('.overlay')[0];
	let normTmpl = {
		struct: params.tmpl.struct.clone(),
		props: params.tmpl.props
	};
	normTmpl.struct.name = params.tmpl.struct.name;
	let length = structNormalization(normTmpl.struct);
	let scale = (2.7 / (length + 5.4 / length)) * 100;

	return render((
		<Attach scale={scale} normTmpl={normTmpl} {...params}/>
	), overlay);
};