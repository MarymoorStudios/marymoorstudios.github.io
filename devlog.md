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
      {% if post.hideDate == true %}
        <a href="{{ post.url }}">{{ post.title }}</a>
      {% else %}        
        <a href="{{ post.url }}">{{ post.date | date: "%Y-%m-%d" }} - {{ post.title }}</a>
      {% endif %}        
      <br>{{ post.excerpt | strip }}
    </li>
  {% endfor %}
</ul>
</div>
