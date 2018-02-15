import os

INPUT_FOLDER = "wav"
OUTPUT_FOLDER = "html"

if __name__ == '__main__':
	if not os.path.isdir(INPUT_FOLDER): os.mkdir(OUTPUT_FOLDER)
	for file_name in os.listdir(INPUT_FOLDER):
		canonical = file_name.split(".")[0]
		content = \
'''<!DOCTYPE html>
<html>
<body>
<audio class='audio-message' autoplay>
<source src="https://github.com/jasp14/musicosyntax/raw/master/chunk_includes/''' + file_name + '''" type='audio/wav'>
</audio>
</body>
</html>
'''
		open(os.path.join(OUTPUT_FOLDER, canonical+".html"), 'w').write(content)
