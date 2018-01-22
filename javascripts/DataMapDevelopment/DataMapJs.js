
//well that sucked, my computer screen went black and I hadn't saved.



//



var NOT_IN_CACHE_STATUS = "NOT_IN_CACHE";



//these hold the pointers
var pointers = [];




//we use two caches, one for the forward reading process and one for the backwards reading process
var initializeCaches = function(pointers, section_width, total_chunks, testing){
	 
	 
	var caches = [
		[],
		[]
	];
	
	//left cache
	var left_cache = initializeDataMapCache(pointers, "BEGINNING", section_width, total_chunks, testing);
	caches[0] = left_cache; 
	
	var right_cache = initializeDataMapCache(pointers, "END", section_width, total_chunks, testing);
	caches[1] = right_cache;
	
	//right cache - given time look into making this a map
	return caches;
}

//@param position String 'BEGINNING' or 'END'.  If the end it gets the last section.
//on hindsight this method is not needed as it will push a section into the cache if the chunk is not in it.
var initializeDataMapCache = function(section_start_hashes, position, section_width_in_chunks, num_chunks, testing){

	var dataMapCache = [];
	
	if(position == "BEGINNING"){
		
		var start_hash = section_start_hashes[0].hash;
		console.log(testing);
		var mapSection = buildSectionOfDataMap(start_hash, section_width_in_chunks, testing);
		dataMapCache.push(mapSection);	
		
	}

	//return the cache on the end
	else if(position == "END"){
		
		//we may not grab a full section
		var last_section_length = num_chunks % section_width_in_chunks;
		
		
		var start_hash = section_start_hashes[section_start_hashes.length-1].hash;
		
		var mapSection = buildSectionOfDataMap(start_hash, last_section_length, testing);
		
		dataMapCache.push(mapSection);
			
		}				
	return dataMapCache;

}
	

var findSectionStartHashes = function(genesis_hash, section_width, num_entries, testing){

	var chunk_id = 0;
	
	var hashes=  [];
	
	var hash = genesis_hash;
	
	for(var i = 0; i < num_entries; i++){
		
		//pull out every section width hashes
		if(i % section_width == 0){
			hashes.push({ chunk_id, hash });
		}
		
		//move to the next one
		if(testing){
			hash = getNextHashTEST(hash);
		}
		else{
			hash = getNextHash(hash);	
		}
		chunk_id++;
	}
	
	return hashes;
}



var getHashFromChunkNumber = function(section_width, chunk_number, indexHashes, cache, cache_limit){

	//check cache
	var hash = checkCache(chunk_number, cache);
	
	//find section start index hash previous to chunk num
	
	var startIndexHash = getStartIndexHash(indexHashes, chunk_number);
	
	
	if(hash == NOT_IN_CACHE_STATUS){
				
		//build section
		var data_map_section = buildSectionOfDataMap(section_width, start_hash);
		
		//add section
		cache.push(data_map_section);
		
		if(cache.length > cache_limit)
			cache.shift();
		//remove oldest section if more than 5 sections
		
	}
}


//
var getNextHash = function(previous_hash) {
  
  return CryptoJS.SHA256(previous_hash);
  
}

//FOR TESTING
var getNextHashTEST = function(previous_hash) {
  
  return previous_hash + 1;
  
}



var buildSectionOfDataMap = function(section_width, start_hash, chunk_num, testing){
	
	var section = [];
	
	var hash = start_hash;
	
	var chunk_id = chunk_num;
	
	var testing = true;
	for(var i = 0; i < section_width; i++){
		
		//console.log({chunk_id: hash});
		
		section.push({ chunk_id, hash });
		
		console.log(testing);
		if(testing){
			hash = getNextHashTEST(hash);
		}
		else{
			hash = getNextHash(hash);	
		}
		chunk_id++;
	}
	
	return section;
}

var testBuildSectionOfDataMap = function(){
	
	var map = buildSectionOfDataMap(3,1,1,true);
	
	console.log(map);
	
	console.log(map[0]);
	
	console.log(map[0].chunk_id);
	console.log(map[0].hash);
	
	
	console.log("should be  [{1:1},{2:2},{3:3}]");
}

testBuildSectionOfDataMap();



var checkCache = function(chunk_number, cache){

	for(cache_section in cache){
		console.log(cache_section);
		if(chunk_number in cache.keys()){
			return cache_section[chunk_number];
		}
	}
	return NOT_IN_CACHE_STATUS;
}



	




var testFindSectionStartHashes = function(){

	var len = 9;

	var wid = 3;
	
	genesis_hash = 1;
	
	var testhashes = findSectionStartHashes(genesis_hash, wid, len, true);
	
	console.log("should be [0-1,3-2,6-7]");
	console.log(testhashes);
	
	console.log(testhashes[0]);
	console.log(testhashes[0][0]);
	console.log(testhashes[0][1]);
	console.log(testhashes[0].chunk_id);

}

testFindSectionStartHashes();







var TestInitializeCaches = function(){
	
	var genesis_hash = 1;
	var section_width = 3;
	var num_chunks = 27;
	var testing = true;
	
	var pointers = findSectionStartHashes(genesis_hash, section_width, num_chunks, testing)
	
	console.log(pointers);
	var caches = initializeCaches(pointers, section_width, num_chunks, testing);

		
	//we pass a boolean indicating if they are in testing mode.  if they are the getnexthash function returns the number plus one,
	//makes it easier to test
	
	//first test is:
	//cache a is [1:1,2:2,3:3], cache b is [25:25,26:26,27:27]
	
	console.log(caches);
}

TestInitializeCaches();
/*
// //Generator to build section of map
// function* buildSectionOfDataMapReversedGenerator(genesis_hash, section_width, number_chunks_total){

	// //we are building and 'in memory' representation of the section. 
	// //we will save the 'last_hash' in case things are destroyed in the calling method
	
	// //cycle through until the start point 
	
	// var num_sections = ceil(number_chunks_total / section_width);
	// // a % b gives num in last section, you only want to go to this num and then the rest you 
	
	// //id starts from 0
	// var chunk_id = num_chunks_total -1;
	
	// //we will count down this time, though count up within the loop
	// var counter = num_chunks_total;
	
	// next_hash = genesis_hash;
	
	// var next_data_map_section = new Array();
	
	// //we want to get a start point, build a section, then decrement the start point for the next section yielded
	// var start_point = number_chunks_total-section_width;
	
	// //startpoint
	// //build the data map for that section
	// for(var i = 0; i < num_sections; i++){
		
		
		
		// //get the hash
		// var section_start = getHashAlongChain(genesis_hash, start_point);
		
		// //build a section 
		
		// //decrement startpoint
		
		
		// //initialize a new map on first chunk of section
		// if(counter % section_width == 0){
			
			// //store last hash and chunk id
			// if(next_data_map_section != {}){
				// storeLastHashOnSectionCompletion(next_hash, chunk_id+1);
				// yield next_data_map_section;
			// }
			// //ok we can move this, but for now we will store the last hash since we have access to it,  I could make it global
			// next_data_map_section = new Array();
			
		// }
		
		// next_hash = getNextHash(next_hash);
		
		// var next_entry = buildNextEntry(next_hash, chunk_id);
		
		// next_data_map_section.push(next_entry);
		
		// chunk_id += 1;
		
	// }
	
	// //return dataMapSection;
// }
	
// //time this one
// var getHashAlongChain = function(genesis_hash, num_iterations){

	// var current_hash = genesis_hash;
	
	// for(var i = 0; i < num_iterations; i++){
	
		// current_hash = getNextHash(current_hash);
	// }
	// return current_hash;
// }


// //Generator to build section of map
// function* buildSectionOfDataMapGenerator(genesis_hash, section_width, number_chunks_total){

	// //we are building and 'in memory' representation of the section. 
	// //we will save the 'last_hash' in case things are destroyed in the calling method
	
	
	// var chunk_id = 0;
	
	// var counter = 0;
	
	// next_hash = genesis_hash;
	
	// var next_data_map_section = new Array();
	
	// //build the data map for that section
	// for(var i = 0; i < number_chunks_total; i++){
		
		// //initialize a new map on first chunk of section
		// if(counter % section_width == 0){
			
			// //store last hash and chunk id
			// if(next_data_map_section != {}){
				// storeLastHashOnSectionCompletion(next_hash, chunk_id-1);
				// yield next_data_map_section;
			// }
			// //ok we can move this, but for now we will store the last hash since we have access to it,  I could make it global
			// next_data_map_section = new Array();
			
		// }
		
		// next_hash = getNextHash(next_hash);
		
		// var next_entry = buildNextEntry(next_hash, chunk_id);
		
		// next_data_map_section.push(next_entry);
		
		// chunk_id += 1;
		
	// }
	
	// //return dataMapSection;
// }
	
// //we can swap this out, would prefer interfaces and polymorphism but haven't looked in to that for JS


// var buildNextEntry =  function(next_hash, chunk_id){
	
	// var entry = { chunk_id: [ next_hash.toString(), false ] };
	
	// return entry;
// }

// var getSectionWidth = function(){

// }

// var storeLastHashOnSectionCompletion = function(last_hash, last_chunk_id){

	// if (typeof(Storage) !== "undefined") {
		// localStorage.setItem("lasthash", last_hash);
	// } else {
		// // Sorry! No Web Storage support.. they will have to send whole file or something else
	// }	
// }

// var dataMapTest = function(){

	// var numChunksInFile = 20;
	
	// var chunksPerSection = 10;
	
	// var numberSections = Math.ceil(numChunksInFile/chunksPerSection);
	
	// var genesis_hash = CryptoJS.SHA256("seed1");
	
	// var data_map_section_generator = buildSectionOfDataMapGenerator(genesis_hash, chunksPerSection, numChunksInFile);
	
	// for(var i = 0; i < numberSections; i++){
	
		// var nextSection = data_map_section_generator.next();
		
		// console.log(nextSection);
		
		// //update and store last hash
	// }
	
// }

// dataMapTest();*/