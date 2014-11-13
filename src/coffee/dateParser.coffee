# This code is copied from "angular-dateParser" library
# https://github.com/dnasir/angular-dateParser

# Copyright (c) 2013 Dzulqarnain Nasir
# Released under MIT License

mod = require('./module')

# Returns string value within a range if it's an integer
mod.factory("dateParserHelpers", [->
  cache = {}
  getInteger: (string, startPoint, minLength, maxLength) ->
    val = string.substring(startPoint)
    matcher = cache[minLength + "_" + maxLength]
    unless matcher
      matcher = new RegExp("^(\\d{" + minLength + "," + maxLength + "})")
      cache[minLength + "_" + maxLength] = matcher
    match = matcher.exec(val)
    return match[1]  if match
    null
]).factory "$dateParser", [
  "$locale"
  "dateParserHelpers"
  ($locale, dateParserHelpers) ->
    # Fetch date and time formats from $locale service
    datetimeFormats = $locale.DATETIME_FORMATS

    # Build array of month and day names
    monthNames = datetimeFormats.MONTH.concat(datetimeFormats.SHORTMONTH)
    dayNames = datetimeFormats.DAY.concat(datetimeFormats.SHORTDAY)
    return (val, format) ->

      # If input is a Date object, there's no need to process it
      return val  if angular.isDate(val)
      try
        val = val + ""
        format = format + ""

        # If no format is provided, just pass it to the Date constructor
        return new Date(val)  unless format.length

        # Check if format exists in the format collection
        format = datetimeFormats[format]  if datetimeFormats[format]

        # Initial values
        now = new Date()
        i_val = 0
        i_format = 0
        format_token = ""
        year = now.getFullYear()
        month = now.getMonth() + 1
        date = now.getDate()
        hh = 0
        mm = 0
        ss = 0
        sss = 0
        ampm = "am"
        z = 0
        parsedZ = false

        # TODO: Extract this into a helper function perhaps?
        while i_format < format.length

          # Get next token from format string
          format_token = format.charAt(i_format)
          token = ""

          # TODO: Handle double single quotes
          # Handle quote marks for strings within format string
          if format.charAt(i_format) is "'"
            _i_format = i_format
            token += format.charAt(i_format)  while (format.charAt(++i_format) isnt "'") and (i_format < format.length)
            throw "Pattern value mismatch"  unless val.substring(i_val, i_val + token.length) is token
            i_val += token.length
            i_format++
            continue
          token += format.charAt(i_format++)  while (format.charAt(i_format) is format_token) and (i_format < format.length)

          # Extract contents of value based on format token
          if token is "yyyy" or token is "yy" or token is "y"
            minLength = undefined
            maxLength = undefined
            if token is "yyyy"
              minLength = 4
              maxLength = 4
            if token is "yy"
              minLength = 2
              maxLength = 2
            if token is "y"
              minLength = 2
              maxLength = 4
            year = dateParserHelpers.getInteger(val, i_val, minLength, maxLength)
            throw "Invalid year"  if year is null
            i_val += year.length
            if year.length is 2
              if year > 70
                year = 1900 + (year - 0)
              else
                year = 2000 + (year - 0)
          else if token is "MMMM" or token is "MMM"
            month = 0
            i = 0

            while i < monthNames.length
              month_name = monthNames[i]
              if val.substring(i_val, i_val + month_name.length).toLowerCase() is month_name.toLowerCase()
                month = i + 1
                month -= 12  if month > 12
                i_val += month_name.length
                break
              i++
            throw "Invalid month"  if (month < 1) or (month > 12)
          else if token is "EEEE" or token is "EEE"
            j = 0

            while j < dayNames.length
              day_name = dayNames[j]
              if val.substring(i_val, i_val + day_name.length).toLowerCase() is day_name.toLowerCase()
                i_val += day_name.length
                break
              j++
          else if token is "MM" or token is "M"
            month = dateParserHelpers.getInteger(val, i_val, token.length, 2)
            throw "Invalid month"  if month is null or (month < 1) or (month > 12)
            i_val += month.length
          else if token is "dd" or token is "d"
            date = dateParserHelpers.getInteger(val, i_val, token.length, 2)
            throw "Invalid date"  if date is null or (date < 1) or (date > 31)
            i_val += date.length
          else if token is "HH" or token is "H"
            hh = dateParserHelpers.getInteger(val, i_val, token.length, 2)
            throw "Invalid hours"  if hh is null or (hh < 0) or (hh > 23)
            i_val += hh.length
          else if token is "hh" or token is "h"
            hh = dateParserHelpers.getInteger(val, i_val, token.length, 2)
            throw "Invalid hours"  if hh is null or (hh < 1) or (hh > 12)
            i_val += hh.length
          else if token is "mm" or token is "m"
            mm = dateParserHelpers.getInteger(val, i_val, token.length, 2)
            throw "Invalid minutes"  if mm is null or (mm < 0) or (mm > 59)
            i_val += mm.length
          else if token is "ss" or token is "s"
            ss = dateParserHelpers.getInteger(val, i_val, token.length, 2)
            throw "Invalid seconds"  if ss is null or (ss < 0) or (ss > 59)
            i_val += ss.length
          else if token is "sss"
            sss = dateParserHelpers.getInteger(val, i_val, 3, 3)
            throw "Invalid milliseconds"  if sss is null or (sss < 0) or (sss > 999)
            i_val += 3
          else if token is "a"
            if val.substring(i_val, i_val + 2).toLowerCase() is "am"
              ampm = "AM"
            else if val.substring(i_val, i_val + 2).toLowerCase() is "pm"
              ampm = "PM"
            else
              throw "Invalid AM/PM"
            i_val += 2
          else if token is "Z"
            parsedZ = true
            if val[i_val] is "Z"
              z = 0
              i_val += 1
            else
              if val[i_val + 3] is ":"
                tzStr = val.substring(i_val, i_val + 6)
                z = (parseInt(tzStr.substr(0, 3), 10) * 60) + parseInt(tzStr.substr(4, 2), 10)
                i_val += 6
              else
                tzStr = val.substring(i_val, i_val + 5)
                z = (parseInt(tzStr.substr(0, 3), 10) * 60) + parseInt(tzStr.substr(3, 2), 10)
                i_val += 5
            throw "Invalid timezone"  if z > 720 or z < -720
          else
            unless val.substring(i_val, i_val + token.length) is token
              throw "Pattern value mismatch"
            else
              i_val += token.length

        # If there are any trailing characters left in the value, it doesn't match
        throw "Pattern value mismatch"  unless i_val is val.length

        # Convert to integer
        year = parseInt(year, 10)
        month = parseInt(month, 10)
        date = parseInt(date, 10)
        hh = parseInt(hh, 10)
        mm = parseInt(mm, 10)
        ss = parseInt(ss, 10)
        sss = parseInt(sss, 10)

        # Is date valid for month?
        if month is 2

          # Check for leap year
          if ((year % 4 is 0) and (year % 100 isnt 0)) or (year % 400 is 0) # leap year
            throw "Invalid date"  if date > 29
          else
            throw "Invalid date"  if date > 28
        throw "Invalid date"  if date > 30  if (month is 4) or (month is 6) or (month is 9) or (month is 11)

        # Correct hours value
        if hh < 12 and ampm is "PM"
          hh += 12
        else hh -= 12  if hh > 11 and ampm is "AM"
        localDate = new Date(year, month - 1, date, hh, mm, ss, sss)
        return new Date(localDate.getTime() - (z + localDate.getTimezoneOffset()) * 60000)  if parsedZ
        return localDate
      catch e
        return `undefined`
      return
]
