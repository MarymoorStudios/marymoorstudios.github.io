---
title: "DevLog"
bg: black
color: white
---
## All Posts

<div>
<ul>
  {% for post in site.devlog | reverse %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a>
      <p style="line-height: 0.5;">{{ post.excerpt | strip }}</p>
    </li>
  {% endfor %}
</ul>
</div>
