// My little experiment with closure
// I'm testing my memory and understanding here

function signed(signoff, first, last){

	function log(){
		console.log(signoff + ",");
		console.log(first + " " + last);
    }

	log();
}

function sign(){signed('Regards', 'Ewe Lin', 'Loo')}; 