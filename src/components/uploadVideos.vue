<template>
    <div>                        
        <div class="d-flex flex-row overflow-scroll">        
            <!-- selected video preview-->               
            <!-- <div>
                <video id="videoWrapper" class="d-none" style="border-radius: 15px; width: 288px; height: 162px;" controls>
                    <source id="videoSource" src="" />
                </video>
            </div> -->
             <!-- video selector -->
             <!-- <div class="ml-3 base-image-input " @click="fileSelectorclicked">        
                    <span v-if="!imageData" class="placeholder">Choose video</span>
                    <input  class="file-input" ref="fileInput" type="file" @input="onSelectFile" accept="video/*" />
            </div> -->

            <!-- simple video (change this later) -->            
            <input class=""  ref="fileInput" type="file" @input="onSelectFile" accept="video/*" />
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      imageData: null,
      videos: [],
    }
  },
  methods: {
    //when the select videos div is clicked, manually click the hidden file input 
    fileSelectorclicked () {
        this.videos = []
        this.$refs.fileInput.click()
    },
    onSelectFile () {
        const input = this.$refs.fileInput
        const file = input.files
            
        // var video_wrapper = document.getElementById('videoWrapper')
        // var source = document.getElementById('videoSource')

        //source.setAttribute('src',URL.createObjectURL(files[0]))
        //video_wrapper.classList.remove('d-none')
        //video_wrapper.play()
        this.$emit('input', file[0])
    }
  }
}
</script>
<style scoped>
.base-image-input {
    border-radius: 15px !important;
    display: block;
    width: 288px;
    height: 162px;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
}
.image-draft {
    cursor: pointer;
}
.placeholder {
    background: #F0F0F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 18px;
    font-family: Helvetica;
    border-radius: 5px;
}
.placeholder:hover {
    background: #E0E0E0;
}
.file-input {
    display: none;
}
</style>