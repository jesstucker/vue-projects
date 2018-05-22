new Vue({
	el: '#notebook',
	data() {
		return {
			content: 'This is a note.',
		}
	},
	computed: {
		notePreview () {
			return marked(this.content)
		},
	},
	watch: {
		content: 'saveNote',
	},

	methods: {
		saveNote () {
			console.log('Saving note:', this.content)
			localStorage.setItem('content', this.content)
			this.reportOperation('saving')
		},
		reportOperation (opName) {
			console.log('The', opName, 'operation was completed!')
		},
	},

	created () {
		this.content = localStorage.getItem('content') || 'You can write in **markdown**'
	},
})

