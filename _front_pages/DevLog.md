---
order: 3
title: "DevLog"
bg: black
color: white
fa-icon: comments
---
# Recent Posts

<div>
<ul>
  {% for post in site.devlog | where: "featured", true | limit: 3 %}
    <li>
      <a href="{{ post.url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a>
      <p style="line-height: 0.5;">{{ post.excerpt | strip }}</p>
    </li>
  {% endfor %}
</ul>
</div>

<div style="text-align: center;">
  <a href="devlog.html">Read More</a>
</div>
