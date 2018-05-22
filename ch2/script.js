new Vue({
	el: '#notebook',
	data() {
		return {
			notes: JSON.parse(localStorage.getItem('notes')) || [],
			selectedId: localStorage.getItem('selected-id') || null,
		}
	},
	computed: {
		selectedNote () {
			return this.notes.find(note => note.id === this.selectedId)
		},
		notePreview () {
			return this.selectedNote ? marked(this.selectedNote.content) : ''
		},
	},

	watch: {
		notes: {
			handler: 'saveNotes',
			deep: true,
		},
		selectedId (val, oldVal) {
			localStorage.setItem('selected-id', val)
		}
	},

	methods: {
		saveNotes () {
			localStorage.setItem('notes', JSON.stringify(this.notes))
			console.log('Notes saved!', new Date())
		},

		reportOperation (opName) {
			console.log('The', opName, 'operation was completed!')
		},

		addNote () {
			const time = Date.now()
			const note = {
				id: String(time),
				title: 'New note ' + (this.notes.length + 1),
				content: '**Hi!** This notebooks is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
				created: time,
				favorite: false,
			}
			this.notes.push(note)
			this.selectNote(note)
		},

		selectNote (note) {
			this.selectedId = note.id
		},


	},

	created () {
		this.content = localStorage.getItem('content') || 'You can write in **markdown**'
	},
})

