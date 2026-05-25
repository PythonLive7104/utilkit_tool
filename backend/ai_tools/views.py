from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

SYSTEM_PROMPTS = {
    'humanize': (
        'You are an expert editor. Rewrite the following AI-generated text to sound '
        'natural, human, and engaging. Vary sentence length, use contractions, add '
        'personality, and remove robotic or overly formal phrasing. Preserve the '
        'original meaning. Return only the rewritten text.'
    ),
    'paraphrase': (
        'Paraphrase the following text. Keep the same meaning but use entirely '
        'different words and sentence structures. Return only the paraphrased text.'
    ),
    'grammar': (
        'Fix all grammar, spelling, punctuation, and style errors in the following '
        'text. Do not change the meaning or tone. Return only the corrected text.'
    ),
    'summarize': (
        'Summarize the following text concisely. Capture the key points in 3-5 '
        'bullet points or a short paragraph depending on length. '
        'Return only the summary.'
    ),
    'title': (
        'Generate 8 compelling, click-worthy titles or headlines for the following '
        'topic or content. Mix styles: question-based, how-to, listicle, and '
        'statement. Return each title on a new line with no numbering or bullets.'
    ),
    'email': (
        'Write a professional, well-structured email based on the following brief. '
        'Include Subject line, greeting, body, call to action, and sign-off. '
        'Return only the complete email text.'
    ),
}


class AiToolView(APIView):
    """
    POST /api/ai/
    Body: { "action": "humanize|paraphrase|grammar|summarize|title|email", "text": "..." }
    Returns: { "result": "..." }
    """

    def post(self, request):
        try:
            from openai import OpenAI
        except ImportError:
            return Response(
                {'detail': 'OpenAI package not installed. Run: pip install openai'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        api_key = getattr(settings, 'OPENAI_API_KEY', None)
        if not api_key:
            return Response(
                {'detail': 'OPENAI_API_KEY is not configured on this server.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        action = request.data.get('action', '').strip()
        text = request.data.get('text', '').strip()

        if action not in SYSTEM_PROMPTS:
            return Response(
                {'detail': f'Unknown action "{action}". Valid actions: {list(SYSTEM_PROMPTS.keys())}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not text:
            return Response({'detail': 'text field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if len(text) > 8000:
            return Response(
                {'detail': 'Input text is too long (max 8000 characters).'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model='gpt-4o-mini',
                messages=[
                    {'role': 'system', 'content': SYSTEM_PROMPTS[action]},
                    {'role': 'user', 'content': text},
                ],
                max_tokens=2000,
                temperature=0.7,
            )
            result = response.choices[0].message.content.strip()
            return Response({'result': result})
        except Exception as exc:
            return Response(
                {'detail': f'OpenAI API error: {str(exc)}'},
                status=status.HTTP_502_BAD_GATEWAY,
            )
