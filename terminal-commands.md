### Check python version:

`python3 --version`

### Check pip version

`pip -- version`

## Install pip:

```
python3 -m ensurepip --upgrade
```

### Install the OpenAI CLI:

```
pip install --upgrade openai
```

### Add our API key:

```
export OPENAI_API_KEY="<OPENAI_API_KEY>"
```

### Start the data preparation and use the -f flag to identify the file where our data is stored:

```
openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
```

for example:

```
openai tools fine_tunes.prepare_data -f we-wingit-data.csv
```

### To create a fine-tuned model

```
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>
```

for example:

```
openai api fine_tunes.create -t we-wingit-data_prepared.jsonl -m gpt-4
```

### To create a model with a higher n_epochs setting

```
openai api fine_tunes.create -t we-wingit-data_prepared.jsonl -m davinci --n_epochs 16
```

### To install the Netlify cli

    npm install netlify-cli -g

### To initialise a netlify site

    netlify init
