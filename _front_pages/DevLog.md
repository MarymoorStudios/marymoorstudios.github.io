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
  {% for post in site.devlog reversed limit:3 %}
    {% if post.featured != "true" %}
      {% continue %}
    {% endif %}

    <li>
      {% if post.hideDate == "true" %}
        <a href="{{ post.url }}">{{ post.title }}</a>
      {% else %}        
        <a href="{{ post.url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a>
      {% endif %}        
      <br>{{ post.excerpt | strip }}
    </li>
  {% endfor %}
</ul>
</div>

<div style="text-align: center;">
  <a href="devlog.html">Read More</a>
</div>
