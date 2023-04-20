const getReplyFromAi = async(prompt , openai) => {

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: prompt,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }) 

    return(completion.data.choices[0].message)
}

export default getReplyFromAi