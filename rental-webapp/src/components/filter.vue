<template>


 <div>
			<v-btn color="white" class="showTextField" fab dark @click="overlay = !overlay">
				<v-icon color="black">filter</v-icon>
			</v-btn>


		
<v-overlay :absolute="absolute" :value="overlay">

	<v-card
		class="mx-auto"
		width="100vw"
		height="25vh"
		
	>

		<v-card-text>
			<h2 class="title mb-2" >Wähle Anbieter</h2>

			<v-chip-group
				column
				multiple
			>
				<v-chip @click="showTier=!showTier; sendData()" color="red" filter outlined>Tier</v-chip>
				<v-chip @click="showNextBikes=!showNextBikes; sendData()" color="blue" filter outlined>Nextbike</v-chip>
				<v-chip @click="showRhingo=!showRhingo; sendData()" color="warning" filter outlined>Rhingo</v-chip>
			</v-chip-group>
		</v-card-text>

		<v-card-actions>  
				<v-btn class="close-btn" fab color="white"  @click="overlay = false">
				<v-icon color="black">mdi-close</v-icon>
			</v-btn>

		</v-card-actions>

	</v-card>

</v-overlay>

</div>
</template>

<script>
export default {
		data: () => ({
			absolute: true,
			overlay: false,
			isTextField: false,
		showNextBikes: true,
				showRhingo: true,
				showTier: true,
		}),
		 methods: {
		sendData: function() {
			this.$emit('provider', [this.showNextBikes, this.showRhingo, this.showTier]);
			
		}
	}

}
</script>

<style>

.showTextField {
	z-index: 3;
	position: fixed;
	right: 7vw;
	top: 30vh;
}


.mx-auto {
		position: fixed;
		bottom: 0;
		left: 0;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;

}



.close-btn {
		position: fixed;
		right: 7vw;
		bottom: 2.5vh;
}

</style>